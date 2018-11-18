'use strict';

window.SERVER_WS_PATH = 'ws://127.0.0.1:8080/ws';
window.SERVER_PATH = 'http://127.0.0.1:8080';

import Router from './Router.js';
import MenuView from './views/MainView/MainView.js';
import GameView from './views/GameView/GameView.js';

const root = document.getElementById('root');
const router = new Router(root);

router
    .register('/game', GameView)
    .register('/:tag', MenuView)
    .register('/', MenuView);

router.start();