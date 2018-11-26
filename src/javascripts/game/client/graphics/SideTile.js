import Tile from "./Tile.js";
import {COLORS} from "../../config.js";
import {WAY_WIDTH} from "../../config.js";
import {TILE_SIZE} from "../../config.js";


class SideTile extends Tile {
    constructor(ctx, rotation) {
        super(ctx);
        this.fillStyle = COLORS.BACKGROUND_SIDE;
        this.rotation = rotation;
        this.gates = [0, null, null, null, null, null];
    }

    draw() {
        super.draw();
        const ctx = this.ctx;
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

export {SideTile};