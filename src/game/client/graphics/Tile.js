import Drawable from "./Drawable.js";
import {COLORS, TILE_SIZE} from "../../config.js";

export default class Tile extends Drawable {
    constructor(x, y) {
        super();
        this._rotation = 0;
        this._rotationCount = 0;

        this.x = x;
        this.y = y;

        this.width = 0;
        this.height = 0;
        this.fillStyle = COLORS.BACKGROUND;
        this.lineColor = COLORS.BORDER;
    }

    get rotation() {
        return this._rotation;
    }

    get rotationCount() {
        return this._rotationCount;
    }

    rotate() {
        this._rotationCount++;
        this._rotationCount %= 6;
        this._rotation = Math.PI / 3 * this.rotationCount;
    }

    _draw(ctx) {
        ctx.lineWidth=5;
        ctx.strokeStyle = this.lineColor; // цвет линии
        ctx.fillStyle = this.fillStyle;
        ctx.beginPath();

        const startX = - TILE_SIZE.x / 2;
        const startY = - TILE_SIZE.y;
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
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'red';
    }

    _setup(ctx) {
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.fillStyle;
    }
}