import Tile from "./Tile.js";
import {COLORS} from "../../config.js";


class CentralTile extends Tile {
    constructor(ctx) {
        super(ctx);
        this.fillStyle = COLORS.BACKGROUND_SIDE;
    }
}

export {CentralTile};