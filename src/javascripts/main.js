'use strict';

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
    .register('/game/:tag', GameController)
    .register('/:tag', MainController)
    .register('/', MainController);

router.start();