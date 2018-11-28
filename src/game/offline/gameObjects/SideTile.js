import Tile from "./Tile.js";
import {SPECIAL_TILES} from "../../config.js";

class SideTile extends Tile {
    constructor(rotationCount) {
        super();
        this.gates = Object.assign([], SPECIAL_TILES.SIDE.gates);
        this.stoneGate = SPECIAL_TILES.SIDE.stoneGate;
        this.setRotation(rotationCount);
        this.setRotationStoneGate(rotationCount);
    }
    setRotationStoneGate(rotationCount) {
        this.stoneGate += rotationCount;
        this.stoneGate %= 6;
    }

    getStone(){
        return this.stone;
    }
}

export default SideTile;