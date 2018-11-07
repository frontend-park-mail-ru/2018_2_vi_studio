import {Tile} from "./tile.js";


class TileWithWays extends Tile {
    constructor(ctx, ways) {
        super(ctx);
        this.ways = ways;
    }

    draw() {
        super.draw();

        const ctx = this.ctx;

        // ============== TYPE 1
        // ctx.beginPath();
        // // ctx.moveTo(this.x, this.y);  // left top
        //
        // ctx.arc(-this.xDelta, 0, this.xDelta / 2, (2 - 2/ 6) * Math.PI , 2 / 6 * Math.PI);
        // ctx.lineWidth = 10;
        // ctx.strokeStyle = "red";
        // ctx.stroke();
        //
        //
        // ctx.beginPath();
        // ctx.arc(this.xDelta, 0, this.xDelta / 2, (2 / 3) * Math.PI , (1 + 1 / 3) * Math.PI);
        // ctx.stroke();
        // //
        // ctx.beginPath();
        // ctx.moveTo(0, -this.yDelta);
        // ctx.lineTo(0, this.yDelta);
        // ctx.stroke();
        // ===================== TYPE 0
        // ctx.beginPath();
        //
        // ctx.arc(-this.xDelta, 0, this.xDelta / 2, (2 - 2/ 6) * Math.PI , 2 / 6 * Math.PI);
        // ctx.lineWidth = 10;
        // ctx.strokeStyle = "red";
        // ctx.stroke();
        //
        //
        // ctx.beginPath();
        // ctx.arc(this.xDelta/2,  - this.yDelta, this.xDelta / 2, Math.PI , 1 / 3 * Math.PI, true);
        // ctx.stroke();
        // //
        // ctx.beginPath();
        // ctx.arc(this.xDelta/2, this.yDelta, this.xDelta / 2, Math.PI , (2 - 1/ 3) * Math.PI);
        // ctx.stroke();

        // ===================== TYPE 2
        // ctx.beginPath();
        // ctx.arc(-this.xDelta * 1.5, this.yDelta , this.xDelta * 1.5, (2 - 1 / 3) * Math.PI, 0);
        // ctx.lineWidth = 10;
        // ctx.strokeStyle = "red";
        // ctx.stroke();
        //
        // ctx.beginPath();
        // ctx.arc(0, this.yDelta * 2 , this.xDelta * 1.5, (1 + 1/3) * Math.PI, (2 - 1/3) * Math.PI);
        // ctx.lineWidth = 10;
        // ctx.strokeStyle = "red";
        // ctx.stroke();
        //
        // ctx.beginPath();
        // ctx.arc(this.xDelta/2,  - this.yDelta, this.xDelta / 2, Math.PI , 1 / 3 * Math.PI, true);
        // ctx.stroke();

        // ===================== TYPE 4

        // ctx.beginPath();
        // ctx.arc(0, this.yDelta * 2, this.xDelta * 1.5, (1 + 1 / 3) * Math.PI, (2 - 1 / 3) * Math.PI);
        // ctx.lineWidth = 10;
        // ctx.strokeStyle = "red";
        // ctx.stroke();
        //
        // ctx.beginPath();
        // ctx.arc(0, -this.yDelta * 2, this.xDelta * 1.5,  1 / 3 * Math.PI, 2 / 3 * Math.PI);
        // ctx.lineWidth = 10;
        // ctx.strokeStyle = "red";
        // ctx.stroke();
        // //
        // ctx.beginPath();
        // ctx.moveTo(0, -this.yDelta);
        // ctx.lineTo(0, this.yDelta);
        // ctx.stroke();

        // ===================== TYPE 3

        ctx.strokeStyle = "green";
        ctx.lineWidth = 17;
        ctx.beginPath();
        ctx.moveTo(0, -this.yDelta);
        ctx.lineTo(0, this.yDelta);
        ctx.stroke();

        ctx.strokeStyle = "black";
        ctx.lineWidth = 11;
        ctx.beginPath();
        ctx.moveTo(0, -this.yDelta);
        ctx.lineTo(0, this.yDelta);
        ctx.stroke();




        ctx.beginPath();
        ctx.rotate(Math.PI / 3);
        ctx.moveTo(0, -this.yDelta);
        ctx.lineTo(0, this.yDelta);
        ctx.stroke();

        ctx.beginPath();
        ctx.rotate(Math.PI / 3);
        ctx.moveTo(0, -this.yDelta);
        ctx.lineTo(0, this.yDelta);
        ctx.stroke();
        ctx.closePath();



    }
}

export {TileWithWays};