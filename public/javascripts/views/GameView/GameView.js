import View from '../View.js';
import Game from "../../game/Game.js";

export default class GameView extends View {
    constructor (el) {
        super(el);
    }

    render () {
        /* render */

        let game = new Game();
        game.start();
    }
}