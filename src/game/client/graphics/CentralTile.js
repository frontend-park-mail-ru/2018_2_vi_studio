import Tile from "./Tile.js";
import {COLORS} from "../../config.js";


export default class CentralTile extends Tile {
    constructor(x, y) {
        super(x, y);
        this.fillStyle = COLORS.BACKGROUND_SIDE;
    }
}
