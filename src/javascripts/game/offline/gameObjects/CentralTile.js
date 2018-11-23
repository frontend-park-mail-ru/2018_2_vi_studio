import Tile from "./Tile.js";
import {SPECIAL_TILES} from "../../client/gameConfig.js";
import {STONE_TYPES} from "../../client/gameConfig.js";


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