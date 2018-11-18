import {Base} from "./base.js";

export class Emerald extends Base {
    constructor(ctx, tile, gate){
        super(ctx);
        this.tile = tile;
        this.gate = gate;
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
    }
}