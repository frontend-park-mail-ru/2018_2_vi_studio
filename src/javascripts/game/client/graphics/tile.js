import {Base} from "./base.js";
const DELTA_X = 60;
const DELTA_Y = Math.sin(Math.PI / 3) * DELTA_X;

class Tile extends Base {
    constructor(ctx) {
        super(ctx);

        ctx.font = "15px Arial";
        this.text = "";

        this.rotation = 0;
        this.rotationCount = 0;
        this.xDelta = DELTA_X;
        this.yDelta = DELTA_Y;
        this.width = 0;
        this.height = 0;
        this.fillStyle = 'yellow';
        this.lineColor = 'green';
    }

    rotate() {
        this.rotationCount++;
        this.rotationCount %= 6;
        this.rotation = Math.PI / 3 * this.rotationCount;
    }

    // /**
    //  * @private
    //  */
    draw() {
        const ctx = this.ctx;
        ctx.lineWidth=5;
        ctx.strokeStyle = this.lineColor; // цвет линии
        ctx.fillStyle = this.fillStyle;
        ctx.beginPath();
        let startX = - this.xDelta / 2;
        let startY = - this.yDelta;
        let pointerX = startX;
        let pointerY = startY;
        ctx.moveTo(pointerX, pointerY);  // left top

        pointerX += this.xDelta;
        ctx.lineTo(pointerX , pointerY);  // right top

        pointerY += this.yDelta;
        ctx.lineTo(pointerX + this.xDelta / 2, pointerY); // right middle

        pointerY += this.yDelta;
        ctx.lineTo(pointerX, pointerY); // right bottom

        pointerX -= this.xDelta;
        ctx.lineTo(pointerX, pointerY); // left bottom

        pointerX -= this.xDelta / 2;
        pointerY -= this.yDelta;
        ctx.lineTo(pointerX, pointerY); // left middle
        ctx.lineTo(startX, startY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        this.ctx.globalAlpha = 1;
        ctx.fillStyle = 'red';
        ctx.fillText(this.text, -15, 0);
        // this.ctx.globalAlpha = 0.45;

    }

    setup() {
        const ctx = this.ctx;

        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.fillStyle;
    }
}

export {Tile};