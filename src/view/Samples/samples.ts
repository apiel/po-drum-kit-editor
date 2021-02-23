import { Player } from 'tone';

import { onSamplesLoaded } from '../../lib/event';
import { getGithubRepo, getGithubUser } from '../../storage/localStorage';
import { elById, evEach, removeChildClass } from '../../utils/dom';

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
    });
}

function onClickSample({ currentTarget }: Event) {
    const el = currentTarget as HTMLElement;
    const { file } = el.dataset;
    console.log('currentTarget', file);
    const player = new Player(
        `https://raw.githubusercontent.com/${getGithubUser()}/${getGithubRepo()}/main/samples/${file}`,
    ).toDestination();
    // play as soon as the buffer is loaded
    player.autostart = true;

    removeChildClass(el.parentElement, 'selected');
    el.classList.add('selected');
}

function onDoubleClickSample({ currentTarget }: Event) {
    const el = currentTarget as HTMLElement;
    const dest = elById('samples-kit');
    removeChildClass(dest, 'selected');
    elById('samples-kit').appendChild(el);
}
