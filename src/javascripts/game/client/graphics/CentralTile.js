import {Tile} from "./tile.js";
import {COLORS} from "../gameConfig.js";


class CentralTile extends Tile {
    constructor(ctx) {
        super(ctx);
        this.fillStyle = COLORS.BACKGROUND_SIDE;
    }
}

export {CentralTile};