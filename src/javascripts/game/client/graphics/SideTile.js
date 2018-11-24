import {Tile} from "./tile.js";
import {COLORS} from "../gameConfig.js";
import {WAY_WIDTH} from "../gameConfig.js";

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
        ctx.arc(0, -this.yDelta / 3 * 2, 10, 0, 2 * Math.PI);

        ctx.strokeStyle = COLORS.WAY;
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(0, -this.yDelta * 2, this.xDelta * 1.5, 1 / 3 * Math.PI, 2 / 3 * Math.PI);
        ctx.strokeStyle = COLORS.WAY;
        ctx.stroke();

    }

}

export {SideTile};