import Controller from './Controller.js';
import Component from "../components/Component.js";
import UserModel from "../models/UserModel.js";
import Navigation from "../components/Navigation/Navigation.js";
import Form from "../components/Form/Form.js";
import Leaderboard from "../components/Leaderboard/Leaderboard.js";
import Rules from "../components/Rules/Rules.js";
import Video from "../components/Video/Video.js";
import SessionModel from "../models/SessionModel.js";
import LeaderModel from "../models/LeaderModel.js";
import Profile from "../components/Profile/Profile.js";
import MainView from "../components/MainView/MainView.js";
import SignInForm from "../components/SignInForm/SignInForm.js";
import SignUpForm from "../components/SignUpForm/SignUpForm.js";

const USER_NAV_ITEMS = [
    {title: 'Online Game', href: '/game/online'},
    {title: 'Offline Game', href: '/game/offline'},
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

export default class MainController extends Controller {
    constructor(router) {
        super(MainView);

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
                this.router.open('/');
            }
        };

        this.renderNav();
    }

    handle(args = []) {
        const action = args[0];

        if (action && this.actions[action]) {
            this.actions[action]();
        } else if (action) {
            this.router.open('/');
        } else {
            this.actions.home();
        }
    }

    renderNav(ignoreAuth) {
        if (ignoreAuth) {
            Component.render(new Navigation({items: GUEST_NAV_ITEMS}), this._view.nav);
            return;
        }

        UserModel.get().then(
            response => {
                if (response.error) {
                    Component.render(new Navigation({items: GUEST_NAV_ITEMS}), this._view.nav)
                } else {

                    Component.render([
                        new Profile({name: response.nickname, avatar: response.avatar}),
                        new Navigation({items: USER_NAV_ITEMS})
                    ], this._view.nav);
                }
            }
        ).catch(alert);
    }

    renderSignIn() {
        const form = new SignInForm();
        Component.render(form, this._view.content);

        form.element.addEventListener("submit", event => {
            event.preventDefault();

            if (!form.isValid()) {
                return;
            }

            SessionModel.add(form.getData()).then(obj => {
                console.log(obj);
                if (obj.error) {
                    // console.log('ERROR');
                    form.showError(obj.error);
                } else {
                    this.renderNav();
                    this.router.open('/');
                }
            }).catch(error => {
                console.log(error);
                form.showError('Wrong username or password');
            });
        });
    };

    renderSignUp() {


        const form = new SignUpForm();
        Component.render(form, this._view.content);

        const formEl = form.element;
        formEl.addEventListener("submit", event => {
            event.preventDefault();

            if (!form.isValid()) {
                return;
            }

            if (formEl.password.value === formEl.rep_password.value) {
                UserModel.add(form.getData()).then(obj => {
                    console.log(obj);
                    this.router.open('/sign_in');
                }).catch(error => {
                    console.log(error);
                    form.showError('Error');
                });
            } else {
                form.showError('Passwords do not match');
            }
        });
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
                this.router.open('/Profile');
            }).catch(error => {
                // TODO: handle
            });
        });
    }

    renderLeaders(page = 1) {
        LeaderModel.getAll(page).then(response => {
                const leaderboard = new Leaderboard({leaders: response.leaders});
                Component.render(leaderboard, this._view.content);

                if (page === 1) {
                    leaderboard.pageUpButtonDisable()
                } else {
                    leaderboard.pageUpButton.addEventListener('click', () => this.renderLeaders(page - 1));
                }

                if (page === response.pageCount) {
                    leaderboard.pageDownButtonDisable();
                } else {
                    leaderboard.pageDownButton.addEventListener('click', () => this.renderLeaders(page + 1));
                }
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