import { GitHubStorage } from '../storage/GitHubStorage';
import { join } from 'path';
import { emitSamplesLoaded, emitKitsLoaded, emitKitLoaded } from './event';

const gitHubStorage = new GitHubStorage();

export async function loadKit(file: string) {
    const samples = await gitHubStorage.readJSON(join('drumkits', file));
    if (samples && Array.isArray(samples)) {
        emitKitLoaded(samples);
    }
}

export function saveKit(file: string, samples: string[]) {
    return gitHubStorage.saveJSON(join('drumkits', file), samples);
}

export async function loadSamples() {
    const samples = await gitHubStorage.readdir('samples');
    emitSamplesLoaded(samples);
}

export async function loadKits() {
    const kits = await gitHubStorage.readdir(`drumkits?${Math.random()}`);
    emitKitsLoaded(kits);
}
