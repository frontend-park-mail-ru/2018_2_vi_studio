import Tile from "./Tile.js";
import {SPECIAL_TILES} from "../../config.js";

class SideTile extends Tile {
    constructor(rotationCount) {
        super();
        this.gates = SPECIAL_TILES.SIDE.gates.slice();
        this.stoneGate = SPECIAL_TILES.SIDE.stoneGate;
        this.setRotation(rotationCount);
        this.setRotationStoneGate(rotationCount);
    }
    setRotationStoneGate(rotationCount) {
        this.stoneGate += rotationCount;
        this.stoneGate %= 6;
    }
}

export default SideTile;