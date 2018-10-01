'use strict';

import { Video } from '../components/video/video.js';
import { Navigation } from '../components/navigation/navigation.js';
import { Form } from '../components/form/form.js';
import { Leaderboard } from '../components/leaderboard/leaderboard.js';
import { Rules } from '../components/rules/rules.js';

const root = document.getElementById('root');
const navRoot = document.getElementById('nav-root');

const pages = {
    home: {title: 'Home', handler: renderHome},
    sign_in: {title: 'Sign in', handler: renderSignIn},
    sign_up: {title: 'Sign up', handler: renderSignUp},
    leaders: {title: 'Leaders', handler: renderLeaders},
    rules: {title: 'Rules', handler: renderRules}
};

function renderSignIn() {
    const form = new Form([
        {label: 'Username', name: 'username', type: 'text'},
        {label: 'Password', name: 'password', type: 'password'},
        {label: 'Sign in', type: 'submit'},
    ]);
    root.appendChild(form.element());
    //
    //
    // formElement.addEventListener("submit", (event) => {
    //     event.preventDefault();
    //     authorize(
    //         formElement.username.value,
    //         formElement.password.value,
    //         formElement.getElementsByClassName('form__error')[0],
    //     )
    // });
    // formElement.classList.add('login');
    //
    // section.appendChild(formElement);
}

function renderSignUp() {
    const form = new Form([
        {label: 'Username', name: 'username', type: 'text'},
        {label: 'E-mail', name: 'email', type: 'email'},
        {label: 'Password', name: 'password', type: 'password'},
        {label: 'Repeat password', name: 'rep_password', type: 'password'},
        {label: 'Sign up', type: 'submit'},
    ]);
    root.appendChild(form.element());

    // const errorField = formElement.getElementsByClassName('form__error')[0];
    //
    // formElement.addEventListener("submit", (event) => {
    //     event.preventDefault();
    //     if (formElement.password.value === formElement.rep_password.value) {
    //         register({
    //             username: formElement.username.value,
    //             email: formElement.email.value,
    //             password: formElement.password.value,
    //         }, errorField)
    //     } else {
    //         errorField.innerText = 'Passwords do not match';
    //         errorField.classList.toggle('form__error_active', true);
    //     }
    // });
    //
    // section.appendChild(formElement);
}

function renderLeaders() {
    const leaders = new Leaderboard([
        {name: 'ViewSharp', points: 3810},
        {name: 'MurMurt', points: 3165},
        {name: 'SchadkoAO', points: 2431},
        {name: 'FakeName', points: 2185},
        {name: 'FakeName', points: 1945},
        {name: 'FakeName', points: 1924},
        {name: 'FakeName', points: 1842},
        {name: 'FakeName', points: 1728},
    ]);

    root.appendChild(leaders.element());
}

function renderRules() {
    const rules = new Rules();
    root.appendChild(rules.element());
}

function renderHome() {
    const video = new Video();
    root.appendChild(video.element());
}

renderHome();

function createNav() {
    const items = [
        {title: 'Home', href: 'home'},
        {title: 'Sign in', href: 'sign_in'},
        {title: 'Sign up', href: 'sign_up'},
        {title: 'Leaders', href: 'leaders'},
        {title: 'Rules', href: 'rules'}
    ];

    const  nav = new Navigation(items);
    navRoot.appendChild(nav.element());
}

createNav();


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

    root.innerHTML = '';

    console.log(link.dataset.href);

    pages[link.dataset.href].handler();
});