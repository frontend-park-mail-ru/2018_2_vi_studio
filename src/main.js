'use strict';

import Router from './Router.js';
import MainController from './controllers/MainController.js';
import GameController from './controllers/GameController.js';
import HomeController from "./controllers/HomeController.js";
import {EVENTS} from "./constants.js";
import bus from './bus.js';
import ErrorController from "./controllers/ErrorController.js";
import Component from "./components/Component.js";
import PopUp from "./components/PopUp/PopUp.js";

import runtime from 'serviceworker-webpack-plugin/lib/runtime.js';
import './main.scss';


if ('serviceWorker' in navigator) {
    const registration = runtime.register();
}

const root = document.getElementById('root');
const router = new Router(root);

const popup = document.getElementById('popup');
Component.render(new PopUp(), popup);

bus.on(EVENTS.QUEUE_POSITION, data => bus.emit(EVENTS.ALERT, {message: 'QUEUE POSITION: ' + data.position}));

router
    .register('/error', ErrorController)
    .register('/game/:tag', GameController)
    .register('/:tag', MainController)
    .register('/', HomeController);

router.start();