import {ROWS_COUNT} from "../../config.js";
import {COLUMNS_COUNT} from "../../config.js";
import {TYPES_ON_MAP} from "../../config.js";
import SideTile from "./SideTile.js";
import TileWithWays from "./TileWithWays.js";
import GateTile from "./GateTile.js";
import CentralTile from "./CentralTile.js";
import {STONE_TYPES} from "../../config.js";
import Stone from "./Stone.js";
import MapSchema from "./MapSchema.js";


const CENTRAL_GREEN_STONES_COUNT = 5;

export default class TileMap {
    constructor() {
        this.stones = [];
        this.tiles = [];
        this.gates = [];
        this.rows = ROWS_COUNT;
        this.columns = COLUMNS_COUNT;
        this.schema = MapSchema.schema;
    }

    init() {
        this.gates = [];
        for (let i = 0; i < ROWS_COUNT; i++) {
            this.tiles.push([]);
            for (let j = 0; j < COLUMNS_COUNT; j++) {
                let tile = null;
                switch (this.schema[i][j].type) {
                    case TYPES_ON_MAP.UNDEF:
                        tile = null;
                        break;
                    case TYPES_ON_MAP.SIDE:
                        tile = new SideTile(this.schema[i][j].rotationCount);
                        const stone = new Stone(STONE_TYPES.YELLOW, tile, i, j, tile.stoneGate);
                        this.stones.push(stone);
                        break;
                    case TYPES_ON_MAP.CENTRAL:
                        tile = new CentralTile();

                        for(let k =0; k < CENTRAL_GREEN_STONES_COUNT; k ++){
                            const stone = new Stone(STONE_TYPES.GREEN, tile, i, j, k);
                            this.stones.push(stone);
                        }
                        const stone1 = new Stone(STONE_TYPES.GREEN, tile, i, j, CENTRAL_GREEN_STONES_COUNT);
                        this.stones.push(stone1);
                        break;
                    case TYPES_ON_MAP.GATE:
                        tile = new GateTile(this.schema[i][j].zero);
                        break;
                    default:
                        tile = new TileWithWays();
                }
                this.tiles[i].push(tile);
            }
        }

        this.gates.push(this.tiles[1][7]);
        this.gates[0].gates = [null, null, null, 0, 0, null];

        this.gates.push(this.tiles[1][8]);
        this.gates[1].gates = [null, null, null, 0, 0, null];

        this.gates.push(this.tiles[4][10]);
        this.gates[2].gates = [null, null, null, null, 1, 1];

        this.gates.push(this.tiles[5][10]);
        this.gates[3].gates = [null, null, null, null, 1, 1];

        this.gates.push(this.tiles[8][8]);
        this.gates[4].gates = [0, null, null, null, null, 0];

        this.gates.push(this.tiles[9][7]);
        this.gates[5].gates = [0, null, null, null, null, 0];

        this.gates.push(this.tiles[9][3]);
        this.gates[6].gates = [1, 1, null, null, null, null];

        this.gates.push(this.tiles[8][2]);
        this.gates[7].gates = [1, 1, null, null, null, null];

        this.gates.push(this.tiles[5][0]);
        this.gates[8].gates = [null, 0, 0, null, null, null];

        this.gates.push(this.tiles[4][0]);
        this.gates[9].gates = [null, 0, 0, null, null, null];

        this.gates.push(this.tiles[1][2]);
        this.gates[10].gates = [null, null, 1, 1, null, null];

        this.gates.push(this.tiles[1][3]);
        this.gates[11].gates = [null, null, 1, 1, null, null];
    }

    haveCollisions(index) {
        let i = 0;
        const stoneToCheck = this.stones[index];
        while (i < this.stones.length) {
            if( i !== index) {
                const stone = this.stones[i];
               if (stone.gate === stoneToCheck.gate && stone.row === stoneToCheck.row && stone.col === stoneToCheck.col) {
                   stone.isOutOfGame = true;
                   stoneToCheck.isOutOfGame = true;
                   return true;
               }
            }
            i++;
        }
        return false;
    }
}