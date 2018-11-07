import {Tile} from "./tile.js";

class SideTile extends Tile {
    constructor(ctx, rotation) {
        super(ctx);
        this.fillStyle = 'orange';
        this.rotation = rotation;
    }

    draw() {
        super.draw();
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(0, -this.yDelta / 3 * 2, 10, 0, 2 * Math.PI);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(0, -this.yDelta * 2, this.xDelta * 1.5, 1 / 3 * Math.PI, 2 / 3 * Math.PI);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "red";
        ctx.stroke();

    }

}

export {SideTile};