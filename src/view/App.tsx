import { React as fix, ElementNode } from 'async-jsx-html';
import { PlayOutline } from '../icons/play-outline';
import { Settings } from './Settings/Settings';
const React = fix;

export function App(): ElementNode {
    return (
        <div id="samples">
            <Settings />
            <p class="info">Double click on sample to move it to other column.</p>
            <button id="play-kit"><PlayOutline /> Play kit</button>
            <div id="samples-list">Samples</div>
            <div id="samples-kit">Kit</div>
            <div style="clear: both"></div>
        </div>
    );
}

