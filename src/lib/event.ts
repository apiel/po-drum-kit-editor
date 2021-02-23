import EventEmitter from 'eventemitter3';

export const event = new EventEmitter();

export enum eventKey {
    onLoadSample = 'onLoadSample',
}

export function onSamplesLoaded(fn: (samples: string[]) => void) {
    event.addListener(eventKey.onLoadSample, fn);
}

export function emitSamplesLoaded(samples: string[]) {
    event.emit(eventKey.onLoadSample, samples);
}
