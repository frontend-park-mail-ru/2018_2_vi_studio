import {Tile} from "./tile.js";


class CentralTile extends Tile {
    constructor(ctx) {
        super(ctx);
        this.fillStyle = 'red';
    }
}

export {CentralTile};