import {Tile} from "./tile.js";
import {COLORS} from "../gameConfig.js";

class GateTile extends Tile {
    constructor(ctx, zero) {
        super(ctx);
        this.zero = zero;
        this.color = 'black';
        this.gates = [];
    }

    draw() {
        this.fillStyle = COLORS.BACKGROUND_GATE;
        if (!this.zero) {

            super.draw();
            const ctx = this.ctx;
            ctx.beginPath();
            ctx.arc(0, 0, 15, 0, 2 * Math.PI);
            ctx.lineWidth = 20;
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
        else {
            super.draw();

        }
    }
}

export {GateTile};