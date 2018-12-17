import Tile from "./Tile.js";
import {TYPE_WAYS, COLORS, WAY_WIDTH, TILE_SIZE} from "../../config.js";

export default class TileWithWays extends Tile {
    constructor(x, y) {
        super(x, y);
    }

    setType(type, rotationCount = 0) {
        this._type = type;
        this._rotationCount = rotationCount % 6;
        this._rotation = Math.PI / 3 * rotationCount;

        if (TYPE_WAYS[type]) {
            let gates = TYPE_WAYS[type].slice();
            for (let i = 0; i < rotationCount; i++) {
                gates.unshift(gates.pop()); // push last element to start
                gates = gates.map(gate => (gate + 1) % 6);
            }
            this.gates = gates;
        } else {
            this.gates = [];
        }
    }
    
    static get halfHeight() {
        return TILE_SIZE.y;
    }
    
    static get halfWidth() {
        return TILE_SIZE.x;
    }

    getType() {
        return this._type;
    }

    _draw(ctx) {
        super._draw(ctx);
        ctx.strokeStyle = COLORS.WAY;
        ctx.lineWidth = WAY_WIDTH;

        switch (this._type) {
            case 0:
                TileWithWays.drawType0(ctx);
                break;
            case 1:
                TileWithWays.drawType1(ctx);
                break;
            case 2:
                TileWithWays.drawType2(ctx);
                break;
            case 3:
                TileWithWays.drawType3(ctx);
                break;
            case 4:
                TileWithWays.drawType4(ctx);
                break;
            default:
        }
    }

    // TODO: PEREDELAT i-gataullin
    static drawType0(ctx) {
        ctx.beginPath();
        ctx.arc(-this.halfWidth, 0, this.halfWidth / 2, (2 - 2 / 6) * Math.PI, 2 / 6 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.halfWidth / 2, -this.halfHeight, this.halfWidth / 2, Math.PI, 1 / 3 * Math.PI, true);
        ctx.stroke();
        //
        ctx.beginPath();
        ctx.arc(this.halfWidth / 2, this.halfHeight, this.halfWidth / 2, Math.PI, (2 - 1 / 3) * Math.PI);
        ctx.stroke();

        ctx.closePath();
    }

    static drawType1(ctx) {
        ctx.beginPath();
        ctx.arc(-this.halfWidth, 0, this.halfWidth / 2, (2 - 2 / 6) * Math.PI, 2 / 6 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.halfWidth, 0, this.halfWidth / 2, (2 / 3) * Math.PI, (1 + 1 / 3) * Math.PI);
        ctx.stroke();
        //
        ctx.beginPath();
        ctx.moveTo(0, -this.halfHeight);
        ctx.lineTo(0, this.halfHeight);
        ctx.stroke();

        ctx.closePath();
    }

    static drawType2(ctx) {
        ctx.beginPath();
        ctx.arc(-this.halfWidth * 1.5, this.halfHeight, this.halfWidth * 1.5, (2 - 1 / 3) * Math.PI, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, this.halfHeight * 2, this.halfWidth * 1.5, (1 + 1 / 3) * Math.PI, (2 - 1 / 3) * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.halfWidth / 2, -this.halfHeight, this.halfWidth / 2, Math.PI, 1 / 3 * Math.PI, true);
        ctx.stroke();

        ctx.closePath();
    }

    static drawType3(ctx) {
        ctx.beginPath();
        ctx.moveTo(0, -this.halfHeight);
        ctx.lineTo(0, this.halfHeight);
        ctx.stroke();

        ctx.beginPath();
        ctx.rotate(Math.PI / 3);
        ctx.moveTo(0, -this.halfHeight);
        ctx.lineTo(0, this.halfHeight);
        ctx.stroke();

        ctx.beginPath();
        ctx.rotate(Math.PI / 3);
        ctx.moveTo(0, -this.halfHeight);
        ctx.lineTo(0, this.halfHeight);
        ctx.stroke();

        ctx.closePath();
    }

    static drawType4(ctx) {
        ctx.beginPath();
        ctx.arc(0, this.halfHeight * 2, this.halfWidth * 1.5, (1 + 1 / 3) * Math.PI, (2 - 1 / 3) * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, -this.halfHeight * 2, this.halfWidth * 1.5, 1 / 3 * Math.PI, 2 / 3 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, -this.halfHeight);
        ctx.lineTo(0, this.halfHeight);
        ctx.stroke();
        ctx.closePath();
    }
}