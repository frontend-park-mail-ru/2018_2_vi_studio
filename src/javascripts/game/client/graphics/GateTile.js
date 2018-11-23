import {Tile} from "./tile.js";

class GateTile extends Tile {
    constructor(ctx, zero) {
        super(ctx);
        this.zero = zero;
        this.color = 'black';
        this.gates = [];
    }

    draw() {

        if (!this.zero) {
            super.draw();
            const ctx = this.ctx;

            ctx.beginPath();
            ctx.arc(0, 0, 15, 0, 2 * Math.PI);
            ctx.lineWidth = 20;
            ctx.strokeStyle = this.color;
            ctx.stroke();
            ctx.closePath();
        }
        else {
            super.draw();
            this.fillStyle = 'green';

        }
    }
}

export {GateTile};