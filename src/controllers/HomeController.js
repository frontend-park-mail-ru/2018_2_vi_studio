import Controller from './Controller.js';
import HomeView from "../components/HomeView/HomeView.js";
import Component from "../components/Component";
import Navigation from "../components/Navigation/Navigation";
import Profile from "../components/Profile/Profile";
import UserModel from "../models/UserModel";
import {EVENTS, GUEST_NAV_ITEMS, USER_NAV_ITEMS} from "../constants.js";
import bus from "../bus.js";

export default class HomeController extends Controller {
    constructor() {
        super(HomeView);
    }

    handle(args = []) {
        const guestNavItems = GUEST_NAV_ITEMS.filter(item => item.title !== 'Home');
        const userNavItems = USER_NAV_ITEMS.filter(item => item.title !== 'Home');

        Component.render(new Navigation({items: guestNavItems}), this._view.content);
        UserModel.get().then(
            response => {
                if (response.error) {
                    Component.render(new Navigation({items: guestNavItems}), this._view.content)
                } else {

                    Component.render([
                        new Profile({name: response.nickname, avatar: response.avatar}),
                        new Navigation({items: userNavItems})
                    ], this._view.content);
                }
            }
        ).catch(error => {
            bus.emit(EVENTS.ALERT, {message: 'Сервис не доступен. Проверьте ваше соединение с интернетом'});
        });
    }
}