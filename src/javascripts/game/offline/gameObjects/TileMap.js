import {ROWS_COUNT} from "../../config.js";
import {COLUMNS_COUNT} from "../../config.js";
import {TYPES_ON_MAP} from "../../config.js";
import SideTile from "./SideTile.js";
import TileWithWays from "./TileWithWays.js";
import GateTile from "./GateTile.js";
import CentralTile from "./CentralTile.js";
import {STONE_TYPES} from "../../config.js";
import Stone from "./Stone.js";

const TYPES = {
    UNDEF: 'UNDEF',
    GATE: 'GATE',
    CENTRAL: 'CENTRAL',
    SIDE: 'SIDE',
    STD: 'STD',
};

export default class TileMap {
    constructor() {
        this.stones = [];
        this.centralStonesCount = 6;

        this.tiles = [];
        this.gates = [];
        this.rows = ROWS_COUNT;
        this.columns = COLUMNS_COUNT;
        this.emeralds = [];
    }

    initSchema() {
        this.schema = [];
        for (let i = 0; i < ROWS_COUNT; i++) {
            this.schema.push([]);
            for (let j = 0; j < COLUMNS_COUNT; j++) {
                this.schema[i].push(TYPES.STD);
            }
        }
        this._setUndefTiles();
        this._setSidesTiles();
        this._setCentralTile();
        this._setGateTiles();

    }

    _setUndefTiles() {
        this.schema[0][0] = {type: TYPES_ON_MAP.UNDEF};
        this.schema[0][1] = {type: TYPES_ON_MAP.UNDEF};
        this.schema[0][2] = {type: TYPES_ON_MAP.UNDEF};
        this.schema[0][3] = {type: TYPES_ON_MAP.UNDEF};
        this.schema[0][5] = {type: TYPES_ON_MAP.UNDEF};
        this.schema[0][7] = {type: TYPES_ON_MAP.UNDEF};
        this.schema[0][8] = {type: TYPES_ON_MAP.UNDEF};
        this.schema[0][9] = {type: TYPES_ON_MAP.UNDEF};
        this.schema[1][0] = {type: TYPES_ON_MAP.UNDEF};
        this.schema[1][1] = {type: TYPES_ON_MAP.UNDEF};
        this.schema[1][9] = {type: TYPES_ON_MAP.UNDEF};


        this.schema[2][0] = {type: TYPES_ON_MAP.UNDEF};
        this.schema[2][10] = {type: TYPES_ON_MAP.UNDEF};


        this.schema[0][COLUMNS_COUNT - 1] = {type: TYPES_ON_MAP.UNDEF};
        this.schema[0][COLUMNS_COUNT - 2] = {type: TYPES_ON_MAP.UNDEF};
        this.schema[1][COLUMNS_COUNT - 1] = {type: TYPES_ON_MAP.UNDEF};

        this.schema[ROWS_COUNT - 3][COLUMNS_COUNT - 1] = {type: TYPES_ON_MAP.UNDEF};
        this.schema[ROWS_COUNT - 2][COLUMNS_COUNT - 1] = {type: TYPES_ON_MAP.UNDEF};
        this.schema[ROWS_COUNT - 1][COLUMNS_COUNT - 1] = {type: TYPES_ON_MAP.UNDEF};
        this.schema[ROWS_COUNT - 1][COLUMNS_COUNT - 2] = {type: TYPES_ON_MAP.UNDEF};
        this.schema[ROWS_COUNT - 1][COLUMNS_COUNT - 3] = {type: TYPES_ON_MAP.UNDEF};

        this.schema[ROWS_COUNT - 1][0] = {type: TYPES_ON_MAP.UNDEF};
        this.schema[ROWS_COUNT - 1][1] = {type: TYPES_ON_MAP.UNDEF};
        this.schema[ROWS_COUNT - 1][2] = {type: TYPES_ON_MAP.UNDEF};
        this.schema[ROWS_COUNT - 2][0] = {type: TYPES_ON_MAP.UNDEF};
        this.schema[ROWS_COUNT - 3][0] = {type: TYPES_ON_MAP.UNDEF};
    }

    _setSidesTiles() {
        // side tiles
        let centralRow = this.rows / 2 ^ 0;
        let centralColumn = this.columns / 2 ^ 0;
        this.schema[1][centralColumn] = {
            // type: TYPES.SIDE, rotation: Math.PI,
            type: TYPES_ON_MAP.SIDE, rotation: 3,
        };
        this.schema[ROWS_COUNT - 1][centralColumn] = {
            type: TYPES_ON_MAP.SIDE, rotation: 0,
        };
        this.schema[centralRow + centralRow - 3][centralColumn + centralRow - 1] = {
            type: TYPES_ON_MAP.SIDE,
            rotation: 5,
            // rotation: 0,
        };
        this.schema[centralRow + centralRow - 3][1] = {
            type: TYPES_ON_MAP.SIDE,
            rotation: 1,
        };
        this.schema[3][9] = {
            type: TYPES_ON_MAP.SIDE,
            rotation: 4,
        };
        this.schema[3][1] = {
            type: TYPES_ON_MAP.SIDE,
            rotation: 2,
        };
    }

    _setCentralTile() {
        let centralRow = this.rows / 2 ^ 0;
        let centralColumn = this.columns / 2 ^ 0;
        this.schema[centralRow][centralColumn] = {
            type: TYPES_ON_MAP.CENTRAL,
        };

    }

    _setGateTiles() {
        this.schema[3][0] = {type: TYPES_ON_MAP.GATE, zero: true};
        this.schema[4][0] = {type: TYPES_ON_MAP.GATE, zero: false}; // 9
        this.schema[5][0] = {type: TYPES_ON_MAP.GATE, zero: false}; // 8
        this.schema[6][0] = {type: TYPES_ON_MAP.GATE, zero: true};

        this.schema[2][1] = {type: TYPES_ON_MAP.GATE, zero: true};
        this.schema[1][2] = {type: TYPES_ON_MAP.GATE, zero: false}; // 10
        this.schema[1][3] = {type: TYPES_ON_MAP.GATE, zero: false}; // 11
        this.schema[0][4] = {type: TYPES_ON_MAP.GATE, zero: true};
        //
        this.schema[0][6] = {type: TYPES_ON_MAP.GATE, zero: true};
        this.schema[1][7] = {type: TYPES_ON_MAP.GATE, zero: false}; // 0
        this.schema[1][8] = {type: TYPES_ON_MAP.GATE, zero: false}; // 1
        this.schema[2][9] = {type: TYPES_ON_MAP.GATE, zero: true};

        this.schema[3][10] = {type: TYPES_ON_MAP.GATE, zero: true};
        this.schema[4][10] = {type: TYPES_ON_MAP.GATE, zero: false}; // 2
        this.schema[5][10] = {type: TYPES_ON_MAP.GATE, zero: false}; // 3
        this.schema[6][10] = {type: TYPES_ON_MAP.GATE, zero: true};

        this.schema[8][1] = {type: TYPES_ON_MAP.GATE, zero: true};
        this.schema[8][2] = {type: TYPES_ON_MAP.GATE, zero: false}; // 7
        this.schema[9][3] = {type: TYPES_ON_MAP.GATE, zero: false}; // 6
        this.schema[9][4] = {type: TYPES_ON_MAP.GATE, zero: true};

        this.schema[8][9] = {type: TYPES_ON_MAP.GATE, zero: true};
        this.schema[8][8] = {type: TYPES_ON_MAP.GATE, zero: false}; // 4
        this.schema[9][7] = {type: TYPES_ON_MAP.GATE, zero: false}; // 5
        this.schema[9][6] = {type: TYPES_ON_MAP.GATE, zero: true};

        // this.schema[0][7] = {type: TYPES.UNDEF};
        // this.schema[0][8] = {type: TYPES.UNDEF};
        // this.schema[0][9] = {type: TYPES.UNDEF};
        // this.schema[1][0] = {type: TYPES.UNDEF};
        // this.schema[1][1] = {type: TYPES.UNDEF};
        // this.schema[1][9] = {type: TYPES.UNDEF};

    }

    init() {
        this.initSchema();
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
                        tile = new SideTile(this.schema[i][j].rotation);
                        const stone = new Stone(STONE_TYPES.YELLOW, tile, i, j, tile.stoneGate);
                        this.stones.push(stone);
                        tile.stone = stone;
                        // this.emeralds.push(new Emerald(this.ctx, tile, row, col, tile.get_gate));
                        break;
                    case TYPES_ON_MAP.CENTRAL:
                        tile = new CentralTile();
                        for(let k =0; k < 5; k ++){
                            const stone = new Stone(STONE_TYPES.GREEN, tile, i, j, k);
                            this.stones.push(stone);
                            tile.stones.push(stone);
                        }
                        const stone1 = new Stone(STONE_TYPES.GREEN, tile, i, j, 5);  // TODO: must be BLUE type
                        this.stones.push(stone1);
                        tile.stones.push(stone1);
                        // tile = null;
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
        const stoneTocheck = this.stones[index];
        while (i < this.stones.length) {
            if( i !== index) {
                const stone = this.stones[i];
               if (stone.gate === stoneTocheck.gate && stone.row === stoneTocheck.row && stone.col === stoneTocheck.col) {
                   stone.isOutOfGame = true;
                   stoneTocheck.isOutOfGame = true;
                   return true;
               }
            }

            i++;
        }
        return false;
    }

    setGates(players) {

        const colors = ['green', 'blue'];

        for(let i = 0; i < this.gates.length; i ++) {
            if (i % 2 === 0){
                this.gates[i].color = 'green';
                this.gates[i].player = players[0];
            } else {
                this.gates[i].color = 'blue';
                this.gates[i].player = players[1];
            }
        }

    }
}