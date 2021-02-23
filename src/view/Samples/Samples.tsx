import { React as fix, ElementNode } from 'async-jsx-html';

const React = fix;

export function Samples(): ElementNode {
    return (
        <div id="samples">
            <p class="info">Double click on sample to move it to other column.</p>
            <div id="samples-list">Samples</div>
            <div id="samples-kit">Kit</div>
        </div>
    );
}
