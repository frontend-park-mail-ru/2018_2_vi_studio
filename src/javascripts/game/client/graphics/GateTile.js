import Tile from "./Tile.js";
import {COLORS} from "../../config.js";

const GATE_TILE_RADIUS = 30;

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
            ctx.arc(0, 0, GATE_TILE_RADIUS, 0, 2 * Math.PI);
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