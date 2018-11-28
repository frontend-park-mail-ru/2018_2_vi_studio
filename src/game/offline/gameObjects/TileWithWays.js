import Tile from "./Tile.js";
import {TYPE_WAYS} from "../../config.js";

class TileWithWays extends Tile {
    constructor() {
        super();
        this.rotationCount = 0;
        this.settled = false;
        this.stonesOnGate = [null, null, null, null, null, null];
        // this.setType(type);
        // this.setRotation(rotationCount);
    }

    setType(type) {
        this.type = type;
        this.rotationCount = 0;
        this.gates = Object.assign([], TYPE_WAYS[type]);
    }
}

export default TileWithWays;