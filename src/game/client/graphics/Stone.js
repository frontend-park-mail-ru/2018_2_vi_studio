import {TILE_SIZE, STONE_TYPES} from "../../config.js";
import {COLORS} from "../../config.js";
import Drawable from "./Drawable.js";

const EMERALD_RADIUS_BORDER = 28;
const EMERALD_RADIUS = 22;

export default class Stone extends Drawable {
    constructor(type, tile, row, col, gate) {
        super();
        this.tile = tile;
        this.gate = gate;
        this.row = row;
        this.col = col;
        this.x = tile.x;
        this.y = tile.y;
        this.type = type;
        this.isOutOfGame = false;
        this.move = false;
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
        this.setPos= this.setPos.bind(this);
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
        this.tile = tile;
        this.gate = gate;
        this.setPosOnGate(gate);
    }

    _setup(ctx) {
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.fillStyle;
    }

    _draw(ctx) {
        if (this.isOutOfGame) {
            return;
        }

        ctx.beginPath();
        ctx.arc(0, -TILE_SIZE.y / 3 * 2, EMERALD_RADIUS_BORDER, 0, 2 * Math.PI);
        ctx.lineWidth = 10;
        ctx.fillStyle = this.backgroundColor;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(0, -TILE_SIZE.y / 3 * 2, EMERALD_RADIUS, 0, 2 * Math.PI);
        ctx.lineWidth = 10;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}