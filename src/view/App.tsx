import { React as fix, ElementNode } from 'async-jsx-html';
import { PlayOutline } from '../icons/play-outline';
import { SettingOutline } from '../icons/setting-outline';
import { Settings } from './Settings/Settings';
import { Samples } from './Samples/Samples';
const React = fix;

export function App(): ElementNode {
    return (
        <>
            <div id="tabs-views">
                <Samples />
                <Settings />
            </div>
            <div id="tabs-menu" class="tabs">
                <button>
                    <PlayOutline />
                    <div>Samples</div>
                </button>
                <button>
                    <SettingOutline />
                    <div>Settings</div>
                </button>
            </div>
        </>
    );
}
