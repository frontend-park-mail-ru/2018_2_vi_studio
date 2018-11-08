import View from '../View.js';
import Game from '../../game/Game.js';
import MODES from '../../game/modes.js';
import Component from "../../components/Component.js";

const LEN_X = 60;
const LEN_Y = Math.sin(Math.PI / 3) * LEN_X;

export default class GameView extends View {
    constructor (el) {
        super(el);
    }

    render () {
        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', '1020');
        canvas.setAttribute('height', '1020');
        Component.render(canvas, this.el);

        const game = new Game(MODES.ONLINE, canvas);
        game.start();
    }
}