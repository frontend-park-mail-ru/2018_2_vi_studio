import {Base} from "./base.js";
import {TILE_SIZE} from "../gameConfig.js";
import {Tile} from "./tile.js";
import {STONE_TYPES, TYPES_ON_MAP} from "../gameConfig.js";

export class Emerald extends Tile {
    constructor(ctx, gate, tile, type) {
        super(ctx);
        this.tile = tile;
        this.gate = gate;
        this.x = tile.x;
        this.y = tile.y;
        this.type = type;
        this.isOutOfGame = false;
        switch (this.type) {
            case STONE_TYPES.YELLOW:
                this.color = 'black';
                break;
            case STONE_TYPES.GREEN:
                this.color = 'green';
                break;
            case STONE_TYPES.BLUE:
                this.color = 'blue';
                break;

        }
        this.setPosOnGate(gate);
    }
    setPosOnGate(gate) {
        switch (gate) {
            case 0:
                this.x += 0;
                break;
            case 1:
                this.y += TILE_SIZE.y / 3;
                this.x += TILE_SIZE.x / 2;
                break;
            case 2:
                this.y += (TILE_SIZE.y);
                this.x += TILE_SIZE.x / 2;
                break;
            case 3:
                this.y += (TILE_SIZE.y + TILE_SIZE.y / 3);
                break;
            case 4:
                this.y += (TILE_SIZE.y);
                this.x -= TILE_SIZE.x / 2;
                break;
            case 5:
                this.y += (TILE_SIZE.y / 3);
                this.x -= TILE_SIZE.x / 2;
                break;
        }
    }

    setPos(tile, gate) {
        this.x = tile.x;
        this.y = tile.y;
        this.gate = gate;
        this.setPosOnGate(gate);
    }

    draw() {
        if (this.isOutOfGame) {
            return;
        }
        console.log("EMERALD");
        // super.draw();
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(0, -this.yDelta / 3 * 2, 10, 0, 2 * Math.PI);
        ctx.lineWidth = 10;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
    }

    setup() {
        const ctx = this.ctx;

        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.fillStyle;
    }
}