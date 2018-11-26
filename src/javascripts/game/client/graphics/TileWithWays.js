import Tile from "./Tile.js";
import {TYPE_WAYS} from "../../config.js";
import {COLORS} from "../../config.js";
import {WAY_WIDTH, TILE_SIZE} from "../../config.js";

class TileWithWays extends Tile {
    constructor(ctx, ways) {
        super(ctx);
        // this.ways = ways;
        this.type = null;
    }

    setType(type) {
        this.type = type;
        if (type) {
            this.ways = Object.assign([], TYPE_WAYS[type]);
        } else {
            this.ways = null;
        }

    }

    setRotation(rotationCount) {
        this.rotationCount = rotationCount % 6;
        this.rotation = Math.PI / 3 * this.rotationCount;
    }

    setTile() {
        for (let i = 0; i < this.rotationCount; i++) {

        }
    }

    draw() {
        // console.log('draw_tile');
        super.draw();

        const ctx = this.ctx;
        ctx.strokeStyle = COLORS.WAY;
        ctx.lineWidth = WAY_WIDTH;

        switch (this.type) {
            case 0:
                this._drawType0(ctx);
                break;
            case 1:
                this._drawType1(ctx);
                break;
            case 2:
                this._drawType2(ctx);
                break;
            case 3:
                this._drawType3(ctx);
                break;
            case 4:
                this._drawType4(ctx);
                break;
            default:
                break;

        }
    }

    _drawType0(ctx) {
        ctx.beginPath();

        ctx.arc(-TILE_SIZE.x, 0, TILE_SIZE.x / 2, (2 - 2/ 6) * Math.PI , 2 / 6 * Math.PI);
        // ctx.lineWidth = 10;
        // ctx.strokeStyle = COLORS.WAY;
        ctx.stroke();


        ctx.beginPath();
        ctx.arc(TILE_SIZE.x/2,  - TILE_SIZE.y, TILE_SIZE.x / 2, Math.PI , 1 / 3 * Math.PI, true);
        ctx.stroke();
        //
        ctx.beginPath();
        ctx.arc(TILE_SIZE.x/2, TILE_SIZE.y, TILE_SIZE.x / 2, Math.PI , (2 - 1/ 3) * Math.PI);
        ctx.stroke();
        ctx.closePath();
    }

    _drawType1(ctx) {
        ctx.beginPath();
        // ctx.moveTo(this.x, this.y);  // left top

        ctx.arc(-TILE_SIZE.x, 0, TILE_SIZE.x / 2, (2 - 2/ 6) * Math.PI , 2 / 6 * Math.PI);
        // ctx.lineWidth = 10;
        // ctx.strokeStyle = "red";
        ctx.stroke();


        ctx.beginPath();
        ctx.arc(TILE_SIZE.x, 0, TILE_SIZE.x / 2, (2 / 3) * Math.PI , (1 + 1 / 3) * Math.PI);
        ctx.stroke();
        //
        ctx.beginPath();
        ctx.moveTo(0, -TILE_SIZE.y);
        ctx.lineTo(0, TILE_SIZE.y);
        ctx.stroke();
        ctx.closePath();

    }

    _drawType2(ctx) {
        ctx.beginPath();
        ctx.arc(-TILE_SIZE.x * 1.5, TILE_SIZE.y , TILE_SIZE.x * 1.5, (2 - 1 / 3) * Math.PI, 0);
        // ctx.lineWidth = 10;
        // ctx.strokeStyle = "red";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, TILE_SIZE.y * 2 , TILE_SIZE.x * 1.5, (1 + 1/3) * Math.PI, (2 - 1/3) * Math.PI);
        // ctx.lineWidth = 10;
        // ctx.strokeStyle = "red";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(TILE_SIZE.x/2,  - TILE_SIZE.y, TILE_SIZE.x / 2, Math.PI , 1 / 3 * Math.PI, true);
        ctx.stroke();
        ctx.closePath();
    }

    _drawType3(ctx) {
        // ctx.strokeStyle = "green";
        // ctx.lineWidth = 17;
        // ctx.beginPath();
        // ctx.moveTo(0, -TILE_SIZE.y);
        // ctx.lineTo(0, TILE_SIZE.y);
        // ctx.stroke();

        // ctx.strokeStyle = "red";
        // ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(0, -TILE_SIZE.y);
        ctx.lineTo(0, TILE_SIZE.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.rotate(Math.PI / 3);
        ctx.moveTo(0, -TILE_SIZE.y);
        ctx.lineTo(0, TILE_SIZE.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.rotate(Math.PI / 3);
        ctx.moveTo(0, -TILE_SIZE.y);
        ctx.lineTo(0, TILE_SIZE.y);
        ctx.stroke();
        ctx.closePath();
    }

    _drawType4(ctx) {
        ctx.beginPath();
        ctx.arc(0, TILE_SIZE.y * 2, TILE_SIZE.x * 1.5, (1 + 1 / 3) * Math.PI, (2 - 1 / 3) * Math.PI);
        // ctx.lineWidth = 10;
        // ctx.strokeStyle = "red";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, -TILE_SIZE.y * 2, TILE_SIZE.x * 1.5,  1 / 3 * Math.PI, 2 / 3 * Math.PI);
        // ctx.lineWidth = 10;
        // ctx.strokeStyle = "red";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, -TILE_SIZE.y);
        ctx.lineTo(0, TILE_SIZE.y);
        ctx.stroke();
        ctx.closePath();
    }

}

export {TileWithWays};