import View from '../View.js';
import Game from '../../game/Game.js';
import MODES from '../../game/modes.js';
import Component from "../../components/Component.js";
import GameComponent from '../../components/game/Game.js';

const LEN_X = 60;
const LEN_Y = Math.sin(Math.PI / 3) * LEN_X;

export default class GameView extends View {
    constructor(el, router) {
        super(el, router);
    }

    render() {
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('width', '1020');
        this.canvas.setAttribute('height', '1020');
        Component.render([new GameComponent(), this.canvas], this.el);
    }


    handle(args) {
        if (args[0] === 'offline') {
            const game = new Game(MODES.OFFLINE, this.canvas);
            game.start();
        } else if (args[0] === 'online') {
            const game = new Game(MODES.ONLINE, this.canvas);
            game.start();
        }

        throw new Error('PAGE NOT FOUND');
    }
}