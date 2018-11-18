import View from '../View.js';
import Background from "../../components/background/Background.pug.js";
import Component from "../../components/Component.js";
import UserModel from "../../models/UserModel.js";
import Navigation from "../../components/navigation/navigation.js";
import Form from "../../components/form/form.js";
import Leaderboard from "../../components/leaderboard/leaderboard.js";
import Rules from "../../components/rules/rules.js";
import Video from "../../components/video/video.js";
import SessionModel from "../../models/SessionModel.js";
import LeaderModel from "../../models/LeaderModel.js";

const USER_NAV_ITEMS = [
    {title: 'Home', href: '/'},
    {title: 'Profile', href: '/profile'},
    {title: 'Leaders', href: '/leaders'},
    {title: 'Rules', href: '/rules'},
    {title: 'Sign out', href: '/sign_out'},
    {title: 'Game', href: '/game'}
];

const GUEST_NAV_ITEMS = [
    {title: 'Home', href: '/'},
    {title: 'Sign in', href: '/sign_in'},
    {title: 'Sign up', href: '/sign_up'},
    {title: 'Leaders', href: '/leaders'},
];

export default class MenuView extends View {
    constructor(el, router) {
        super(el, router);

        this.actions = {
            home: this.renderHome.bind(this),
            sign_in: this.renderSignIn.bind(this),
            sign_up: this.renderSignUp.bind(this),
            leaders: this.renderLeaders.bind(this),
            rules: this.renderRules.bind(this),
            profile: this.renderProfile.bind(this),
            sign_out: () => {
                SessionModel.remove();
                this.renderNav();
                this.router.open('/')
            }
        };
    }

    render() {
        const contentEL = document.createElement('div');
        contentEL.classList.add('main-view__content');
        this.content = contentEL;

        const navEl = document.createElement('nav');
        navEl.classList.add('main-view__navigation');
        this._navRoot = navEl;

        const newEl = this.el.cloneNode();
        Component.render([
            new Background(),
            contentEL,
            navEl
        ], newEl);

        this.el.parentNode.replaceChild(newEl, this.el);
        this.el = newEl;
        this.el.classList.add('main-view');

        this.renderNav();
    }

    handle(args) {
        if (args.length === 0) {
            this.actions.home();
        } else {
            this.actions[args[0]]();
        }
    }

    renderNav() {
        UserModel.get().then(
            response => response.error ?
                Component.render(new Navigation({items: GUEST_NAV_ITEMS}), this._navRoot) :
                Component.render(new Navigation({items: USER_NAV_ITEMS}), this._navRoot)
        ).catch(alert);
    }

    renderSignIn() {
        const inputs = [
            {label: 'Nickname', name: 'nickname', type: 'text'},
            {label: 'Password', name: 'password', type: 'password'},
            {label: 'Sign in', type: 'submit'},
        ];

        const form = new Form({inputs: inputs});
        Component.render(form, this.content);

        const formEl = this.content.getElementsByClassName('form')[0];
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
        Component.render(form, this.content);

        const formEl = this.content.getElementsByClassName('form')[0];
        formEl.addEventListener("submit", (event) => {
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
            {label: 'Update', type: 'submit'},
        ];

        Component.render(new Form({inputs: inputs}), this.content);

        // DataSource.getProfile(
        //     (obj) => {
        //         formEl.nickname.value = obj.nickname;
        //         formEl.email.value = obj.email;
        //     },
        //     (error) => {
        //         console.log(error);
        //         form.showError('Authorize error');
        //     }
        // );
    }

    renderLeaders() {
        LeaderModel.getAll().then(
            leaders => Component.render(new Leaderboard({leaders: leaders}), this.content)
        );
    }

    renderRules() {
        Component.render(new Rules(), this.content);
    }

    renderHome() {
        Component.render(new Video(), this.content);
    }
}