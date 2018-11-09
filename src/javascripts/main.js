'use strict';

window.SERVER_WS_PATH = 'ws://20182vistudioserver-kkdnijptrs.now.sh/GameController-ws';
window.SERVER_PATH = 'http://20182vistudioserver-kkdnijptrs.now.sh';

import Router from './Router.js';
import MainController from './controllers/MainController.js';
import GameController from './controllers/GameController.js';
import bus from './bus.js';

const root = document.getElementById('root');
const router = new Router(root);


bus.on('GameController-event-QueuePosition', info => alert('QUEUE POSITION: ' + info));
bus.on('GameController-event-GameStart', () => alert('GAME START'));
bus.on('GameController-event-GameOver', () => alert('GAME OVER'));


router
    .register('/GameController/:tag', GameController)
    .register('/:tag', MainController)
    .register('/', MainController);

router.start();