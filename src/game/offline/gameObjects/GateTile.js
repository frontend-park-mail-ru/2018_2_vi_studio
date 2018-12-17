import Tile from "./Tile.js";

class GateTile extends Tile {
    constructor(zero) {
        super();
        this.zero = zero;
        this.gates = null;
    }
}

export default GateTile;