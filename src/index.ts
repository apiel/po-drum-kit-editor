import { initApp } from './view/app';
import { App } from './view/App';
import { loadSamples } from './lib/git';

App()
    .render()
    .then((html) => {
        document.getElementById('app').innerHTML = html as string;
        initApp();
    });

loadSamples();
