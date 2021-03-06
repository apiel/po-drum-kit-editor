import { Player } from 'tone';

import { onKitLoaded, onKitsLoaded, onSamplesLoaded } from '../lib/event';
import { loadKit, loadKits, loadSamples, saveKit } from '../lib/git';
import {
    getGithubRepo,
    getGithubToken,
    getGithubUser,
    storeGithubToken,
    storeCurrentKit,
    getCurrentKit,
} from '../storage/localStorage';
import { elById, evEach, removeChildClass } from '../utils/dom';
import { sleep } from '../utils/utils';

export function initSamples() {
    elById('play-kit').addEventListener('click', playKit);
    elById('load').addEventListener('click', () => {
        if (getGithubUser() && getGithubRepo()) {
            loadSamples();
            loadKits();
        } else {
            alert('Please provide github user and repo');
        }
    });
    onSamplesLoaded((samples) => {
        samples.forEach((sample) => {
            elById(
                'samples-list',
            ).innerHTML += `<div class="sample" data-file="${sample}">${sample}</div>`;
        });
        evEach(
            document.querySelectorAll('#samples-list .sample') as any,
            'click',
            onClickSample,
        );
        evEach(
            document.querySelectorAll('#samples-list .sample') as any,
            'dblclick',
            onDoubleClickSample,
        );
    });

    onKitsLoaded((kits) => {
        elById('load-kit').innerHTML = '<option></option>';
        kits.forEach((kit) => {
            elById('load-kit').innerHTML += `<option>${kit}</option>`;
        });
        if (getCurrentKit()) {
            (elById('load-kit') as HTMLInputElement).value = getCurrentKit();
            loadKit(getCurrentKit());
        }
    });
    elById('load-kit').addEventListener('change', ({ currentTarget }) => {
        loadKit((currentTarget as HTMLInputElement).value);
    });

    onKitLoaded((samples) => {
        const elKit = elById('samples-kit');
        const elList = elById('samples-list');
        const items = Array.from(
            elKit.querySelectorAll('.sample'),
        ) as HTMLElement[];
        items.forEach((el) => elList.appendChild(el));

        samples.forEach((sample) => {
            const el = elList.querySelector(`.sample[data-file="${sample}"]`);
            elKit.appendChild(el);
        });
    });

    elById('save-kit').addEventListener('click', async () => {
        if (!getGithubToken()) {
            const token = prompt(
                'Please first provide your github personal access token:',
            );
            storeGithubToken(token);
        }
        if (getGithubToken()) {
            const filename = prompt(
                'Provide a filename for saving the kit:',
                (elById('load-kit') as HTMLInputElement).value,
            );
            const samples = (Array.from(
                elById('samples-kit').querySelectorAll('.sample'),
            ) as HTMLElement[]).map(({ dataset }) => dataset.file);
            await saveKit(filename, samples);
            storeCurrentKit(filename);
            location.reload();
        }
    });
}

async function playKit() {
    const el = elById('samples-kit');
    removeChildClass(el, 'selected');

    const items = Array.from(el.querySelectorAll('.sample')) as HTMLElement[];
    for (const item of items) {
        item.classList.add('selected');
        await play(item.dataset.file);
        await sleep(500);
        item.classList.remove('selected');
    }
}

function play(file: string) {
    return new Promise((resolve) => {
        const player = new Player(
            `https://raw.githubusercontent.com/${getGithubUser()}/${getGithubRepo()}/main/samples/${file}`,
            async () => {
                player.start();
                // timeout of 5 sec
                for (let retry = 0; retry < 50; retry++) {
                    await sleep(100);
                    if (player.state === 'stopped') {
                        resolve(true);
                        return;
                    }
                }
                resolve(true);
            },
        ).toDestination();
    });
}

function onClickSample({ currentTarget }: Event) {
    const el = currentTarget as HTMLElement;
    const { file } = el.dataset;
    play(file);
    removeChildClass(el.parentElement, 'selected');
    el.classList.add('selected');
}

function onDoubleClickSample({ currentTarget }: Event) {
    const el = currentTarget as HTMLElement;
    const dest =
        el.parentElement.id === 'samples-list'
            ? elById('samples-kit')
            : elById('samples-list');
    removeChildClass(dest, 'selected');
    dest.appendChild(el);
}
