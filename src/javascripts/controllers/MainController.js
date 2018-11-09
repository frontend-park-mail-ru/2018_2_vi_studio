import Controller from './Controller.js';
import Component from "../components/Component.js";
import UserModel from "../models/UserModel.js";
import Navigation from "../components/navigation/Navigation.js";
import Form from "../components/Form/Form.js";
import Leaderboard from "../components/leaderboard/Leaderboard.js";
import Rules from "../components/rules/rules.js";
import Video from "../components/video/video.js";
import SessionModel from "../models/SessionModel.js";
import LeaderModel from "../models/LeaderModel.js";
import Profile from "../components/profile/Profile.js";
import Button from "../components/Button/Button.js";
import MainView from "../components/MainView/MainView";

const USER_NAV_ITEMS = [
    {title: 'GameController Online', href: '/GameController/online'},
    {title: 'GameController Offline', href: '/GameController/offline'},
    {title: 'Home', href: '/'},
    {title: 'Profile', href: '/profile'},
    {title: 'Leaders', href: '/leaders'},
    {title: 'Rules', href: '/rules'},
    {title: 'Sign out', href: '/sign_out'}
];

const GUEST_NAV_ITEMS = [
    {title: 'Home', href: '/'},
    {title: 'Sign in', href: '/sign_in'},
    {title: 'Sign up', href: '/sign_up'},
    {title: 'Leaders', href: '/leaders'},
    {title: 'Rules', href: '/rules'},
];

const AVATAR_PATH = window.SERVER_PATH + '/media/images/';

export default class MainController extends Controller {
    constructor(router) {
        super();

        this.router = router;

        this.actions = {
            home: this.renderHome.bind(this),
            sign_in: this.renderSignIn.bind(this),
            sign_up: this.renderSignUp.bind(this),
            leaders: this.renderLeaders.bind(this),
            rules: this.renderRules.bind(this),
            profile: this.renderProfile.bind(this),
            sign_out: () => {
                SessionModel.remove();
                this.renderNav(true);
                this.router.open('/')
            }
        };

        this._view = new MainView();
        this._element = this._view.element;
    }

    handle(args = []) {
        const action = args[0];

        if (action && this.actions[action]) {
            this.actions[action]()
        } else {
            this.router.open('/');
        }
    }

    renderNav(ignoreAuth) {
        if (ignoreAuth) {
            Component.render(new Navigation({items: GUEST_NAV_ITEMS}), this._view.nav);
            return
        }

        UserModel.get().then(
            response => {
                if (response.error) {
                    Component.render(new Navigation({items: GUEST_NAV_ITEMS}), this._view.nav)
                } else {
                    Component.render([
                        new Profile({
                            name: response.nickname,
                            avatar: AVATAR_PATH + response.avatar
                        }),
                        new Navigation({items: USER_NAV_ITEMS})
                    ], this._view.nav);
                }
            }
        ).catch(alert);
    }

    renderSignIn() {
        const inputs = [
            {label: 'Nickname', name: 'nickname', type: 'text'},
            {label: 'Password', name: 'password', type: 'password'},
            {label: 'Sign in', type: 'submit'},
        ];

        const form = new Form({inputs: inputs});
        Component.render(form, this._view.content);

        const formEl = form.element;
        formEl.addEventListener("submit", event => {
            event.preventDefault();
            SessionModel.add({
                nickname: formEl.nickname.value,
                password: formEl.password.value
            }).then(obj => {
                console.log(obj);
                this.renderNav();
                this.router.open('/');
            }).catch(error => {
                console.log(error);
                form.showError('Wrong username or password');
            });
        });
    };

    renderSignUp() {
        const inputs = [
            {label: 'Nickname', name: 'nickname', type: 'text'},
            {label: 'E-mail', name: 'email', type: 'email'},
            {label: 'Password', name: 'password', type: 'password'},
            {label: 'Repeat password', name: 'rep_password', type: 'password'},
            {label: 'Sign up', type: 'submit'},
        ];

        const form = new Form({inputs: inputs});
        Component.render(form, this._view.content);

        const formEl = form.element;
        formEl.addEventListener("submit", event => {
            event.preventDefault();
            if (formEl.password.value === formEl.rep_password.value) {
                UserModel.add({
                    nickname: formEl.nickname.value,
                    email: formEl.email.value,
                    password: formEl.password.value,
                }).then(obj => {
                    console.log(obj);
                    this.router.open('sign_in');
                }).catch(error => {
                    console.log(error);
                    form.showError('Error');
                });
            } else {
                form.showError('Passwords do not match');
            }
        })
    }

    renderProfile() {
        const inputs = [
            {label: 'Nickname', name: 'nickname', type: 'text'},
            {label: 'E-mail', name: 'email', type: 'email'},
            {label: 'Password', name: 'password', type: 'password'},
            {label: 'Repeat password', name: 'rep_password', type: 'password'},
            {label: 'Avatar', name: 'avatar', type: 'file'},
            {label: 'Update', type: 'submit'},
        ];

        const form = new Form({inputs: inputs});
        Component.render(form, this._view.content);

        const formEl = form.element;
        UserModel.get().then(obj => {
            formEl.nickname.value = obj.nickname;
            formEl.email.value = obj.email;
        }).catch(error => {
            // TODO: handle
        });

        formEl.addEventListener("submit", event => {
            event.preventDefault();
            if (formEl.password.value !== formEl.rep_password.value) {
                form.showError('Passwords do not match');
                return
            }

            UserModel.update({
                nickname: formEl.nickname.value,
                email: formEl.email.value,
                password: formEl.password.value,
            }).then(() =>
                formEl.avatar.value !== '' ? UserModel.addAvatar(formEl.avatar.files[0]) : null
            ).then(() => {
                this.renderNav();
                this.router.open('/profile');
            }).catch(error => {
                // TODO: handle
            });
        })
    }

    renderLeaders(page = 1) {
        LeaderModel.getAll(page).then(leaders => {
                const prev = new Button({label: '<-'});
                const next = new Button({label: '->'});

                if (page === 1) {
                    Component.render([new Leaderboard({leaders: leaders}), next], this._view.content);
                } else {
                    Component.render([new Leaderboard({leaders: leaders}), prev, next], this._view.content);
                }

                prev.element.addEventListener('click', () => this.renderLeaders(page - 1));
                next.element.addEventListener('click', () => this.renderLeaders(page + 1));
            }
        );
    }

    renderRules() {
        Component.render(new Rules(), this._view.content);
    }

    renderHome() {
        Component.render(new Video(), this._view.content);
    }
}