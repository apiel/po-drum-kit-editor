import EventEmitter from 'eventemitter3';

export const event = new EventEmitter();

export enum eventKey {
    onLoadSamples = 'onLoadSamples',
    onLoadKits = 'onLoadKits',
    onLoadKit = 'onLoadKit',
}

export function onSamplesLoaded(fn: (files: string[]) => void) {
    event.addListener(eventKey.onLoadSamples, fn);
}

export function emitSamplesLoaded(files: string[]) {
    event.emit(eventKey.onLoadSamples, files);
}

export function onKitsLoaded(fn: (files: string[]) => void) {
    event.addListener(eventKey.onLoadKits, fn);
}

export function emitKitsLoaded(files: string[]) {
    event.emit(eventKey.onLoadKits, files);
}

export function onKitLoaded(fn: (files: string[]) => void) {
    event.addListener(eventKey.onLoadKit, fn);
}

export function emitKitLoaded(files: string[]) {
    event.emit(eventKey.onLoadKit, files);
}