import Tile from "./Tile.js";
import {COLORS} from "../../config.js";

const GATE_TILE_RADIUS = 30;

export default class GateTile extends Tile {
    constructor(zero, x, y) {
        super(x, y);
        this.zero = zero;
        this.color = 'black';
        this.gates = [];
    }

    _draw(ctx) {
        this.fillStyle = COLORS.BACKGROUND_GATE;
        if (!this.zero) {
            super._draw(ctx);

            ctx.beginPath();
            ctx.arc(0, 0, GATE_TILE_RADIUS, 0, 2 * Math.PI);
            ctx.lineWidth = 20;
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
        else {
            super._draw(ctx);
        }
    }
}