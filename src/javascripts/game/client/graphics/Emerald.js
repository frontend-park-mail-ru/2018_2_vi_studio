import Base from "./Base.js";
import {TILE_SIZE} from "../../config.js";
import Tile from "./Tile.js";
import {STONE_TYPES, TYPES_ON_MAP} from "../../config.js";
import {COLORS} from "../../config.js";

const EMERALD_RADIUS_BORDER = 28;
const EMERALD_RADIUS = 22;

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
                this.color = COLORS.STONE_YELLOW;
                this.backgroundColor = COLORS.STONE_YELLOW_BOARD;
                break;
            case STONE_TYPES.GREEN:
                this.color = COLORS.STONE_GREEN;
                this.backgroundColor = COLORS.STONE_GREEN_BOARD;
                break;
            case STONE_TYPES.BLUE:
                this.color = 'blue';
                this.backgroundColor = 'green';
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
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(0, -this.yDelta / 3 * 2, EMERALD_RADIUS_BORDER, 0, 2 * Math.PI);
        ctx.lineWidth = 10;
        ctx.fillStyle = this.backgroundColor;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();

        ctx.arc(0, -this.yDelta / 3 * 2, EMERALD_RADIUS, 0, 2 * Math.PI);
        ctx.lineWidth = 10;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    setup() {
        const ctx = this.ctx;

        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.fillStyle;
    }
}