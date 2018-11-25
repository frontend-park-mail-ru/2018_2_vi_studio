'use strict';

import Router from './Router.js';
import MainController from './controllers/MainController.js';
import GameController from './controllers/GameController.js';
import bus from './bus.js';

// import runtime from 'serviceworker-webpack-plugin/lib/runtime';


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

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/build/sw.js', {scope: '/build/'})
        .then((registration) => {
            console.log('sw registration on scope:', registration.scope);
        })
        .catch((err) => {
            console.error(err);
        });
}