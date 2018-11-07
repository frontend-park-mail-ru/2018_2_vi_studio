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

        const game = new Game(MODES.OFFLINE, canvas);
        game.start();
    }

    drawTile(ctx, startX, startY) {
        let lenX = 60;
        let lenY = Math.sin(Math.PI / 3) * lenX;
        // let startX = 0;
        // let startY = 0;
        let pointerX = 0;
        let pointerY = 0;

        ctx.lineWidth=5;
        ctx.strokeStyle = "#ff0000"; // цвет линии

        ctx.beginPath();

        pointerX = startX + lenX / 2;
        pointerY = startY;
        ctx.moveTo(pointerX, pointerY);  // left top

        pointerX += lenX;
        ctx.lineTo(pointerX , pointerY);  // right top

        pointerY += lenY;
        ctx.lineTo(pointerX + lenX / 2, pointerY); // right middle

        pointerY += lenY;
        ctx.lineTo(pointerX, pointerY); // right bottom

        pointerX -= lenX;
        ctx.lineTo(pointerX, pointerY); // left bottom

        pointerX -= lenX / 2;
        pointerY -= lenY;
        ctx.lineTo(pointerX, pointerY); // left middle
        ctx.lineTo(startX + lenX / 2, startY);
        ctx.closePath();
        ctx.stroke();
    }
}