import { Player } from 'tone';

import { onSamplesLoaded } from '../lib/event';
import { getGithubRepo, getGithubUser } from '../storage/localStorage';
import { elById, evEach, removeChildClass } from '../utils/dom';
import { sleep } from '../utils/utils';

export function initSamples() {
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
        elById('play-kit').addEventListener('click', playKit);
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
