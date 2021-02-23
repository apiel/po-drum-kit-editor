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

// export function saveSequences() {
//     return gitHubStorage.saveJSON(
//         join('sequences', 'sequences.json'),
//         sequences,
//     );
// }

export async function loadSamples() {
    const samples = await gitHubStorage.readdir('samples');
    emitSamplesLoaded(samples);
}

export async function loadKits() {
    const kits = await gitHubStorage.readdir('drumkits');
    emitKitsLoaded(kits);
}
