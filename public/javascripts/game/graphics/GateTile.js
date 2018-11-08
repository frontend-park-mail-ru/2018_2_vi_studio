import {Tile} from "./tile.js";

class GateTile extends Tile {
    constructor(ctx, zero) {
        super(ctx);
        this.zero = zero;
        this.color = 'black';
        this.player = null;
    }

    draw() {
        if (!this.zero) {
            const ctx = this.ctx;

            ctx.beginPath();
            ctx.arc(0, 0, 15, 0, 2 * Math.PI);
            ctx.lineWidth = 20;
            ctx.strokeStyle = this.color;
            ctx.stroke();
            ctx.closePath();
        }
        else {
            this.fillStyle = 'green';
        }
        super.draw();
    }
}

export {GateTile};