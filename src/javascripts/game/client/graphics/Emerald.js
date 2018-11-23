import {Base} from "./base.js";
import {TILE_SIZE} from "../gameConfig.js";
import {Tile} from "./tile.js";

export class Emerald extends Tile {
    constructor(ctx, gate, tile, type){
        super(ctx);
        this.tile = tile;
        this.gate = gate;
        this.x = tile.x;
        this.y = tile.y;
        this.type = type;
        switch (gate) {
            case 0:
                this.y -= (TILE_SIZE.y);
                break;
            case 1:
                this.y -= (TILE_SIZE.y) / 2;
                this.x += TILE_SIZE.x /2;
                break;
            case 2:
                this.y += (TILE_SIZE.y) / 2;
                this.x += TILE_SIZE.x /2;
                break;
            case 3:
                this.y += (TILE_SIZE.y);
                break;
            case 4:
                this.y += (TILE_SIZE.y) / 2;
                this.x -= TILE_SIZE.x /2;
                break;
            case 5:
                this.y -= (TILE_SIZE.y) / 2;
                this.x -= TILE_SIZE.x /2;
                break;
        }

    }

    draw() {
        console.log("EMERALD");
        // super.draw();
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(0, -this.yDelta / 3 * 2, 10, 0, 2 * Math.PI);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "blue";
        ctx.stroke();
        ctx.closePath();
    }

    setup(){
        const ctx = this.ctx;

        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.fillStyle;
    }
}