import { applyToChild, elByClass, elById } from '../utils/dom';
import { initSettings } from './Settings/settings';
import { initSamples } from './Samples/samples';

function showTab(btnIndex: number) {
    const fn = (tab: HTMLElement, tabIndex: number) => {
        if (btnIndex === tabIndex) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    };
    applyToChild(elById('tabs-menu'), fn);
    applyToChild(elById('tabs-views'), fn);
}

function getTab() {
    return (
        window.history.state?.tabId ||
        Number(sessionStorage.getItem('activeTab')) ||
        0
    );
}

function showSessionTab() {
    showTab(getTab());
    // hide all modal
    Array.from(elByClass('modal')).forEach((el) => el.classList.add('hide'));
}

export function initApp() {
    showSessionTab();
    applyToChild(elById('tabs-menu'), (btn, btnIndex) => {
        btn.onclick = () => {
            sessionStorage.setItem('activeTab', btnIndex.toString());
            window.history.pushState({ tabId: btnIndex }, '');
            showTab(btnIndex);
        };
    });

    initSettings();
    initSamples();
}

window.addEventListener('popstate', showSessionTab);
// window.history.pushState({ tabId: btnIndex }, `tab ${btnIndex}`, '/url/hello');
