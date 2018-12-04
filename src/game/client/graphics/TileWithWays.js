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

    getType() {
        return this._type;
    }

    _draw(ctx) {
        super._draw(ctx);
        ctx.strokeStyle = COLORS.WAY;
        ctx.lineWidth = WAY_WIDTH;

        switch (this._type) {
            case 0:
                TileWithWays.drawArcWay(ctx, -TILE_SIZE.x, 0, TILE_SIZE.x / 2, 300, 60);
                TileWithWays.drawArcWay(ctx, TILE_SIZE.x / 2, -TILE_SIZE.y, TILE_SIZE.x / 2, 180, 60, true);
                TileWithWays.drawArcWay(ctx, TILE_SIZE.x / 2, TILE_SIZE.y, TILE_SIZE.x / 2, 180, 300);
                break;
            case 1:
                TileWithWays.drawArcWay(ctx, -TILE_SIZE.x, 0, TILE_SIZE.x / 2, 300, 60);
                TileWithWays.drawArcWay(ctx, TILE_SIZE.x, 0, TILE_SIZE.x / 2, 120, 240);
                TileWithWays.drawStraightWay(ctx, 0, -TILE_SIZE.y, 0, TILE_SIZE.y);
                break;
            case 2:
                TileWithWays.drawArcWay(ctx, -TILE_SIZE.x * 1.5, TILE_SIZE.y, TILE_SIZE.x * 1.5, 300, 0);
                TileWithWays.drawArcWay(ctx, 0, TILE_SIZE.y * 2, TILE_SIZE.x * 1.5, 240, 300);
                TileWithWays.drawArcWay(ctx, TILE_SIZE.x / 2, -TILE_SIZE.y, TILE_SIZE.x / 2, 180, 60, true);
                break;
            case 3:
                TileWithWays.drawStraightWay(ctx, 0, -TILE_SIZE.y, 0, TILE_SIZE.y);
                ctx.rotate(Math.PI / 3);
                TileWithWays.drawStraightWay(ctx, 0, -TILE_SIZE.y, 0, TILE_SIZE.y);
                ctx.rotate(Math.PI / 3);
                TileWithWays.drawStraightWay(ctx, 0, -TILE_SIZE.y, 0, TILE_SIZE.y);
                break;
            case 4:
                TileWithWays.drawArcWay(ctx, 0, TILE_SIZE.y * 2, TILE_SIZE.x * 1.5, 240, 300);
                TileWithWays.drawArcWay(ctx, 0, -TILE_SIZE.y * 2, TILE_SIZE.x * 1.5, 60, 120);
                TileWithWays.drawStraightWay(ctx, 0, -TILE_SIZE.y, 0, TILE_SIZE.y);
                break;
            default:
        }
    }

    static drawArcWay(ctx, x, y, radius, startAngle, endAngle, anticlockwise = false) {
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle * Math.PI / 180, endAngle * Math.PI / 180, anticlockwise);
        ctx.stroke();
        ctx.closePath();
    }

    static drawStraightWay(ctx, startX, startY, endX, endY) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.closePath();
    }
}