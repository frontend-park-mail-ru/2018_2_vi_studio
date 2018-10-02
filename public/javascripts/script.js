'use strict';

import {Navigation} from '../components/navigation/navigation.js';
import {Root} from '../components/root/root.js';
import {Auth, DataSource} from './modules/data-source.js';

const root = document.getElementById('root');
const navRoot = document.getElementById('nav-root');

function renderNav() {
    DataSource.getProfile(() => {
        navRoot.innerHTML = '';
        const navElem = new Navigation([
            {title: 'Home', href: 'home'},
            {title: 'Profile', href: 'profile'},
            {title: 'Leaders', href: 'leaders'},
            {title: 'Rules', href: 'rules'},
            {title: 'Sign out', href: 'sign_out'}]);
        navRoot.appendChild(navElem.element());
    }, () => {
        navRoot.innerHTML = '';
        const navElem = new Navigation([
            {title: 'Home', href: 'home'},
            {title: 'Sign in', href: 'sign_in'},
            {title: 'Sign up', href: 'sign_up'},
            {title: 'Leaders', href: 'leaders'},
            {title: 'Rules', href: 'rules'}]);
        navRoot.appendChild(navElem.element());
    });

}

(() => {
    renderNav();

    const rootElem = new Root(() => renderNav());
    root.appendChild(rootElem.element());

    const pages = {
        home: {title: 'Home', handler: () => rootElem.renderHome()},
        sign_in: {title: 'Sign in', handler: () => rootElem.renderSignIn()},
        sign_up: {title: 'Sign up', handler: () => rootElem.renderSignUp()},
        leaders: {title: 'Leaders', handler: () => rootElem.renderLeaders()},
        rules: {title: 'Root', handler: () => rootElem.renderRules()},
        profile: {title: 'Root', handler: () => rootElem.renderProfile()},
        sign_out: {
            title: 'Root', handler: () => {
                Auth.signOut();
                rootElem.renderHome();
                renderNav();
            }
        }
    };

    navRoot.addEventListener('click', (event) => {
        if (!(event.target instanceof HTMLAnchorElement)) {
            return;
        }

        event.preventDefault();

        const link = event.target;

        console.log({
            href: link.href,
            dataHref: link.dataset.href
        });

        pages[link.dataset.href].handler();
    });
})();