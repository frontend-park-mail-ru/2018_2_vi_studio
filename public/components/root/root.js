import {Form} from "../form/form.js";
import {Leaderboard} from "../leaderboard/leaderboard.js";
import {Rules} from "../rules/rules.js";
import {Video} from "../video/video.js";
import {Auth} from '../../javascripts/modules/data-source.js';
import {DataSource} from "../../javascripts/modules/data-source.js";

export class Root {
    constructor(renderNav) {
        this._el = document.createElement('div');
        this._el.classList.add('root');
        this.renderHome();
        this._renderNav =renderNav;
    }

    renderSignIn() {
        this._clean();
        const form = new Form([
            {label: 'Nickname', name: 'nickname', type: 'text'},
            {label: 'Password', name: 'password', type: 'password'},
            {label: 'Sign in', type: 'submit'},
        ]);

        const formEl = form.element();
        this._el.appendChild(formEl);

        formEl.addEventListener("submit", (event) => {
            event.preventDefault();
            Auth.signIn(
                {
                    nickname: formEl.nickname.value,
                    password: formEl.password.value
                },
                (obj) => {
                    console.log(obj);
                    this.renderHome();
                    this._renderNav();
                },
                (error) => {
                    console.log(error);
                    form.showError('Wrong username or password');
                }
            );
        });
    };

    renderSignUp() {
        this._clean();
        const form = new Form([
            {label: 'Nickname', name: 'nickname', type: 'text'},
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
                Auth.signUp({
                        nickname: formEl.nickname.value,
                        email: formEl.email.value,
                        password: formEl.password.value,
                    },
                    (obj) => {
                        console.log(obj);
                        this._el.innerHTML = '';
                        this.renderSignIn();

                    },
                    (error) => {
                        console.log(error);
                        form.showError('Error');
                    });
            } else {
                form.showError('Passwords do not match');
            }
        });
    }

    renderProfile() {
        this._clean();
        const form = new Form([
            {label: 'Nickname', name: 'nickname', type: 'text'},
            {label: 'E-mail', name: 'email', type: 'email'},
            {label: 'Password', name: 'password', type: 'password'},
            {label: 'Repeat password', name: 'rep_password', type: 'password'},
            {label: 'Update', type: 'submit'},
        ]);

        const formEl = form.element();
        this._el.appendChild(formEl);

        DataSource.getProfile(
            (obj) => {
                formEl.nickname.value = obj.nickname;
                formEl.email.value = obj.email;
            },
            (error) => {
                console.log(error);
                form.showError('Authorize error');
            }
        );
    }

    renderLeaders() {
        this._clean();
        DataSource.getLeaders(
            (obj) => {
                const leaders = new Leaderboard(obj);
                this._el.appendChild(leaders.element());
            },
            () => {
            }
        );
    }

    renderRules() {
        this._clean();
        const rules = new Rules();
        this._el.appendChild(rules.element());
    }

    renderHome() {
        this._clean();
        const video = new Video();
        this._el.appendChild(video.element());
    }

    element() {
        return this._el;
    }

    _clean() {
        this._el.innerHTML = '';
    }
}