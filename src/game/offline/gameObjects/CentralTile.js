// import Tile from "./Tile.js";
// import {SPECIAL_TILES} from "../../config.js";
import {STONE_TYPES} from "../../config.js";

// TODO: write
class CentralTile {
    constructor() {
        this.stonesTypes = [
            STONE_TYPES.GREEN,
            STONE_TYPES.GREEN,
            STONE_TYPES.GREEN,
            STONE_TYPES.GREEN,
            STONE_TYPES.GREEN,
            STONE_TYPES.BLUE];
        this.stones = [];
    }

    getStone() {
        return this.stones.shift();
    }
}

export default CentralTile;