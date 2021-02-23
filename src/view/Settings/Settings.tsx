import { React as fix, ElementNode } from 'async-jsx-html';
import {
    getGithubRepo,
    getGithubUser,
} from '../../storage/localStorage';

const React = fix;

export function Settings(): ElementNode {
    return (
        <div>
            Github settings:
            <div class="input">
                <label>User</label>
                <input
                    id="githubUser"
                    value={getGithubUser()}
                    placeholder="Enter github user"
                />
            </div>
            <div class="input">
                <label>Repo</label>
                <input
                    id="githubRepo"
                    value={getGithubRepo()}
                    placeholder="Enter github repo"
                />
            </div>
        </div>
    );
}

/* <div>
<label>Github token</label>
<input
    id="githubToken"
    type="password"
    value={getGithubToken()}
    placeholder="Enter github token"
/>
<button id="githubTokenToggle">
    <EyeOffOutline class="icon" id="eye-off" />
    <EyeOutline class="icon hide" id="eye-on" />
</button>
</div>
<GithubTokenInfo /> */
