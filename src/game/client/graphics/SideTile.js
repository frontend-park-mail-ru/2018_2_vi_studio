import Tile from "./Tile.js";
import {COLORS, WAY_WIDTH, TILE_SIZE} from "../../config.js";
import {SPECIAL_TILES} from "../../config";

export default class SideTile extends Tile {
    constructor(rotationCount, x, y) {
        super(x, y);
        this.fillStyle = COLORS.BACKGROUND_SIDE;
        this.gates = SPECIAL_TILES.SIDE.gates.slice();
        // this.gates = [0, null, null, null, null, null];
        this._rotation = Math.PI / 3 * rotationCount;
    }

    _draw(ctx) {
        super._draw(ctx);

        ctx.lineWidth = WAY_WIDTH;
        ctx.beginPath();
        ctx.arc(0, -TILE_SIZE.y / 3 * 2, 10, 0, 2 * Math.PI);

        ctx.strokeStyle = COLORS.WAY;
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(0, -TILE_SIZE.y * 2, TILE_SIZE.x * 1.5, 1 / 3 * Math.PI, 2 / 3 * Math.PI);
        ctx.strokeStyle = COLORS.WAY;
        ctx.stroke();
    }

}