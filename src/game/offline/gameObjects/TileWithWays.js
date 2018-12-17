import Tile from "./Tile.js";
import {TYPE_WAYS} from "../../config.js";

class TileWithWays extends Tile {
    constructor() {
        super();
        this.rotationCount = 0;
        this.settled = false;
    }

    setType(type) {
        this.type = type;
        this.rotationCount = 0;
        this.gates = TYPE_WAYS[type].slice();
    }
}

export default TileWithWays;