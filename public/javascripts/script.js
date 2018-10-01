'use strict';

import {Navigation} from '../components/navigation/navigation.js';
import {Root} from '../components/root/root.js';

const root = document.getElementById('root');
const navRoot = document.getElementById('nav-root');

const COOKIE = window.CookieModule;

(() => {
    const rootElem = new Root();
    root.appendChild(rootElem.element());

    console.log(COOKIE.getCookie('access_token'));

    const navElem = new Navigation([
        {title: 'Home', href: 'home'},
        {title: 'Sign in', href: 'sign_in'},
        {title: 'Sign up', href: 'sign_up'},
        {title: 'Leaders', href: 'leaders'},
        {title: 'Rules', href: 'rules'}
    ]);
    navRoot.appendChild(navElem.element());

    const pages = {
        home: {
            title: 'Home', handler: () => {
                rootElem.renderHome()
            }
        },
        sign_in: {
            title: 'Sign in', handler: () => {
                rootElem.renderSignIn()
            }
        },
        sign_up: {
            title: 'Sign up', handler: () => {
                rootElem.renderSignUp()
            }
        },
        leaders: {
            title: 'Leaders', handler: () => {
                rootElem.renderLeaders()
            }
        },
        rules: {
            title: 'Root', handler: () => {
                rootElem.renderRules()
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

        rootElem.clean();

        console.log(link.dataset.href);

        pages[link.dataset.href].handler();
    });
})();