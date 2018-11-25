import Base from "./Base.js";
import {COLORS} from "../../config.js";
import {TILE_SIZE} from "../../config.js";

// TODO: rewrite
const DELTA_X = TILE_SIZE.x;
const DELTA_Y = TILE_SIZE.y;

class Tile extends Base {
    constructor(ctx) {
        super(ctx);
        ctx.font = "15px Arial";
        this.rotation = 0;
        this.rotationCount = 0;

        // TODO: rewrite !!!
        this.xDelta = DELTA_X;
        this.yDelta = DELTA_Y;

        this.width = 0;
        this.height = 0;
        this.fillStyle = COLORS.BACKGROUND;
        this.lineColor = COLORS.BORDER;
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

    }

    setup() {
        const ctx = this.ctx;

        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.fillStyle;
    }
}

export default Tile;