import { GitHubStorage } from '../storage/GitHubStorage';
import { join } from 'path';
import { emitSamplesLoaded } from './event';

const gitHubStorage = new GitHubStorage();

// export async function loadSequences() {
//     const sequences = await gitHubStorage.readJSON(
//         join('sequences', 'sequences.json'),
//     );
//     if (sequences && Array.isArray(sequences)) {
//         setSequences(sequences);
//     }
// }

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
