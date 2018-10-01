import {Form} from "../form/form.js";
import {Leaderboard} from "../leaderboard/leaderboard.js";
import {Rules} from "../rules/rules.js";
import {Video} from "../video/video.js";

const AJAX = window.AjaxModule;
const COOKIE = window.CookieModule;

export class Root {
    constructor() {
        this._el = document.createElement('div');
        this._el.classList.add('root');
        this.renderHome();
    }

    renderSignIn() {
        const form = new Form([
            {label: 'Nickname', name: 'nickname', type: 'text'},
            {label: 'Password', name: 'password', type: 'password'},
            {label: 'Sign in', type: 'submit'},
        ]);

        const formEl = form.element();
        this._el.appendChild(formEl);

        formEl.addEventListener("submit", (event) => {
            event.preventDefault();
            AJAX.authorize(
                {
                    nickname: formEl.nickname.value,
                    password: formEl.password.value
                },
                (obj) => {
                    COOKIE.setCookie('access_token', obj.AccessToken);
                    console.log(obj);
                },
                (error) => {
                    console.log(error);
                    form.showError('Wrong username or password');
                }
            )
        });
    };

    renderSignUp() {
        const form = new Form([
            {label: 'Username', name: 'username', type: 'text'},
            {label: 'E-mail', name: 'email', type: 'email'},
            {label: 'Password', name: 'password', type: 'password'},
            {label: 'Repeat password', name: 'rep_password', type: 'password'},
            {label: 'Sign up', type: 'submit'},
        ]);

        const formEl = form.element();
        this._el.appendChild(formEl);

        formEl.addEventListener("submit", (event) => {
            event.preventDefault();
            if (formEl.password.value === formEl.rep_password.value) {
                AJAX.register({
                        nickname: formEl.username.value,
                        email: formEl.email.value,
                        password: formEl.password.value,
                    },
                    (obj) => {
                        console.log(obj);
                        root.innerHTML = '';
                        renderSignIn();

                    },
                    (error) => {
                        console.log(error);
                        form.showError('Error');
                    })
            } else {
                form.showError('Passwords do not match');
            }
        });
    }

    renderLeaders() {
        AJAX.getLeaders(
            (obj) => {
                const leaders = new Leaderboard(obj);
                this._el.appendChild(leaders.element());
            },
            () => {
            }
        );
    }

    renderRules() {
        const rules = new Rules();
        this._el.appendChild(rules.element());
    }

    renderHome() {
        const video = new Video();
        this._el.appendChild(video.element());
    }

    element() {
        return this._el;
    }

    clean() {
        this._el.innerHTML = '';
    }
}