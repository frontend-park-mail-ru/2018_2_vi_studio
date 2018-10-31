import {Game} from 'game/game';
import {MODES} from "./modes";


const modes = MODES;

const LEN_X = 60;
const LEN_Y = Math.sin(Math.PI / 3) * LEN_X;

window.onload = function() {
    let canvas = document.getElementById('tutorial');
    const game = new Game(canvas, modes.OFFLINE);
    game.start();

    // if (canvas.getContext) {
    //     let ctx = canvas.getContext('2d');
    //     let image = document.getElementById('source');
    //
    //     ctx.drawImage(image, 0, 0, 120 , 2 * LEN_Y);
    //
    //     drawTile(ctx, 0, 0);
    //     drawTile(ctx, ctx.canvas.width/2 - LEN_X, ctx.canvas.height / 2 - LEN_Y );
    //
    // }
}

function drawTile(ctx, startX, startY) {
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