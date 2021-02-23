import { React as fix, ElementNode } from 'async-jsx-html';
import { PlayOutline } from '../icons/play-outline';
import { SaveOutline } from '../icons/save-outline';
import { GithubTokenInfo } from './Settings/GithubTokenInfo';
import { Settings } from './Settings/Settings';
const React = fix;

export function App(): ElementNode {
    return (
        <div id="samples">
            <Settings />
            <p>
                <button id="load">Load samples</button>
            </p>
            <p>
                <label>Kit loader</label>
                <select id="load-kit">
                    <option></option>
                </select>
            </p>
            <p class="info">
                Double click on sample to move it to other column.
            </p>
            <button id="play-kit" class="btn-square">
                <PlayOutline /> Play kit
            </button>
            <button id="save-kit" class="btn-square">
                <SaveOutline /> Save kit
            </button>
            <div id="samples-list">Samples</div>
            <div id="samples-kit">Kit</div>
            <div style="clear: both"></div>
            <GithubTokenInfo />
        </div>
    );
}
