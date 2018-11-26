import Base from "./Base.js";
import {COLORS} from "../../config.js";
import {TILE_SIZE} from "../../config.js";

// TODO: rewrite
// const DELTA_X = TILE_SIZE.x;
// const DELTA_Y = TILE_SIZE.y;

class Tile extends Base {
    constructor(ctx) {
        super(ctx);
        ctx.font = "15px Arial";
        this.rotation = 0;
        this.rotationCount = 0;

        // TILE_SIZE.x = DELTA_X;
        // TILE_SIZE.y = DELTA_Y;

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
        let startX = - TILE_SIZE.x / 2;
        let startY = - TILE_SIZE.y;
        let pointerX = startX;
        let pointerY = startY;
        ctx.moveTo(pointerX, pointerY);  // left top

        pointerX += TILE_SIZE.x;
        ctx.lineTo(pointerX , pointerY);  // right top

        pointerY += TILE_SIZE.y;
        ctx.lineTo(pointerX + TILE_SIZE.x / 2, pointerY); // right middle

        pointerY += TILE_SIZE.y;
        ctx.lineTo(pointerX, pointerY); // right bottom

        pointerX -= TILE_SIZE.x;
        ctx.lineTo(pointerX, pointerY); // left bottom

        pointerX -= TILE_SIZE.x / 2;
        pointerY -= TILE_SIZE.y;
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