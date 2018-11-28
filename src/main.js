'use strict';

import Router from './Router.js';
import MainController from './controllers/MainController.js';
import GameController from './controllers/GameController.js';
import {EVENTS} from "./constants.js";
import bus from './bus.js';

import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import './main.scss';
import ErrorController from "./controllers/ErrorController";


if ('serviceWorker' in navigator) {
    const registration = runtime.register();
}

const root = document.getElementById('root');
const router = new Router(root);

bus.on(EVENTS.QUEUE_POSITION, data => alert('QUEUE POSITION: ' + data.position));
bus.on(EVENTS.GAME_OVER, () => alert('GAME OVER'));

router
    .register('/error', ErrorController)
    .register('/game/:tag', GameController)
    .register('/:tag', MainController)
    .register('/', MainController);

router.start();