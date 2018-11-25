import Tile from "./Tile.js";
import {TYPE_WAYS} from "../../config.js";

class GateTile extends Tile {
    constructor(zero) {
        super();
        this.zero = zero;
        this.gates = null;
    }
}

export default GateTile;