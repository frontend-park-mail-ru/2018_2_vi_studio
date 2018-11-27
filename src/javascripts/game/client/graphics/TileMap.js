import Base from "./Base.js";
import {TileWithWays} from "./TileWithWays.js";
import {SideTile} from "./SideTile.js";
import {CentralTile} from "./CentralTile.js";
import {GateTile} from "./GateTile.js";
import {Emerald} from "./Emerald.js";
import {TILE_SIZE} from "../../config.js";

const ROWS_COUNT = 10;
const COLUMNS_COUNT = 11;
const TYPES = {
    UNDEF: 'UNDEF',
    GATE: 'GATE',
    CENTRAL: 'CENTRAL',
    SIDE: 'SIDE',
    STD: 'STD',
};

export class TileMap {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 80;
        this.y = 40;
        this.tiles = [];
        this.gates = [];
        this.rows = ROWS_COUNT;
        this.columns = COLUMNS_COUNT;
        this.stones = [];

        // console.log('TILES', this.tiles);
    }

    initSchema() {

        // this.schema = [];
        // for (let i = 0; i < ROWS_COUNT; i++) {
        //     this.schema.push([]);
        //     for (let j = 0; j < COLUMNS_COUNT; j++) {
        //         this.schema[i].push(TYPES.STD);
        //     }
        // }

        this.schema = [];
        for (let i = 0; i < ROWS_COUNT; i++) {
            this.schema.push(new Array(COLUMNS_COUNT).fill(TYPES.STD));
        }


        this._setUndefTiles();
        this._setSidesTiles();
        this._setCentralTile();
        this._setGateTiles();
        this.setGates();

    }

    _setUndefTiles() {
        this.schema[0][0] = {type: TYPES.UNDEF};
        this.schema[0][1] = {type: TYPES.UNDEF};
        this.schema[0][2] = {type: TYPES.UNDEF};
        this.schema[0][3] = {type: TYPES.UNDEF};
        this.schema[0][5] = {type: TYPES.UNDEF};
        this.schema[0][7] = {type: TYPES.UNDEF};
        this.schema[0][8] = {type: TYPES.UNDEF};
        this.schema[0][9] = {type: TYPES.UNDEF};
        this.schema[1][0] = {type: TYPES.UNDEF};
        this.schema[1][1] = {type: TYPES.UNDEF};
        this.schema[1][9] = {type: TYPES.UNDEF};


        this.schema[2][0] = {type: TYPES.UNDEF};
        this.schema[2][10] = {type: TYPES.UNDEF};


        this.schema[0][COLUMNS_COUNT - 1] = {type: TYPES.UNDEF};
        this.schema[0][COLUMNS_COUNT - 2] = {type: TYPES.UNDEF};
        this.schema[1][COLUMNS_COUNT - 1] = {type: TYPES.UNDEF};

        this.schema[ROWS_COUNT - 3][COLUMNS_COUNT - 1] = {type: TYPES.UNDEF};
        this.schema[ROWS_COUNT - 2][COLUMNS_COUNT - 1] = {type: TYPES.UNDEF};
        this.schema[ROWS_COUNT - 1][COLUMNS_COUNT - 1] = {type: TYPES.UNDEF};
        this.schema[ROWS_COUNT - 1][COLUMNS_COUNT - 2] = {type: TYPES.UNDEF};
        this.schema[ROWS_COUNT - 1][COLUMNS_COUNT - 3] = {type: TYPES.UNDEF};

        this.schema[ROWS_COUNT - 1][0] = {type: TYPES.UNDEF};
        this.schema[ROWS_COUNT - 1][1] = {type: TYPES.UNDEF};
        this.schema[ROWS_COUNT - 1][2] = {type: TYPES.UNDEF};
        this.schema[ROWS_COUNT - 2][0] = {type: TYPES.UNDEF};
        this.schema[ROWS_COUNT - 3][0] = {type: TYPES.UNDEF};
    }

    _setSidesTiles() {
        // side tiles
        let centralRow = this.rows / 2 ^ 0;
        let centralColumn = this.columns / 2 ^ 0;
        this.schema[1][centralColumn] = {
            type: TYPES.SIDE, rotation: Math.PI,
        };
        this.schema[ROWS_COUNT - 1][centralColumn] = {
            type: TYPES.SIDE, rotation: 0,
        };
        this.schema[centralRow + centralRow - 3][centralColumn + centralRow - 1] = {
            type: TYPES.SIDE,
            rotation: Math.PI / 3 * 5,
        };
        this.schema[centralRow + centralRow - 3][1] = {
            type: TYPES.SIDE,
            rotation: Math.PI / 3,
            // rotation: 0,
        };
        this.schema[3][9] = {
            type: TYPES.SIDE,
            rotation: Math.PI / 3 * 4,
        };
        this.schema[3][1] = {
            type: TYPES.SIDE,
            rotation: Math.PI / 3 * 2,
        };
    }

    _setCentralTile() {
        let centralRow = this.rows / 2 ^ 0;
        let centralColumn = this.columns / 2 ^ 0;
        this.schema[centralRow][centralColumn] = {
            type: TYPES.CENTRAL,
        };

    }

    _setGateTiles() {
        this.schema[3][0] = {type: TYPES.GATE, zero: true};
        this.schema[4][0] = {type: TYPES.GATE, zero: false}; // 9
        this.schema[5][0] = {type: TYPES.GATE, zero: false}; // 8
        this.schema[6][0] = {type: TYPES.GATE, zero: true};

        this.schema[2][1] = {type: TYPES.GATE, zero: true};
        this.schema[1][2] = {type: TYPES.GATE, zero: false}; // 10
        this.schema[1][3] = {type: TYPES.GATE, zero: false}; // 11
        this.schema[0][4] = {type: TYPES.GATE, zero: true};
        //
        this.schema[0][6] = {type: TYPES.GATE, zero: true};
        this.schema[1][7] = {type: TYPES.GATE, zero: false}; // 0
        this.schema[1][8] = {type: TYPES.GATE, zero: false}; // 1
        this.schema[2][9] = {type: TYPES.GATE, zero: true};

        this.schema[3][10] = {type: TYPES.GATE, zero: true};
        this.schema[4][10] = {type: TYPES.GATE, zero: false}; // 2
        this.schema[5][10] = {type: TYPES.GATE, zero: false}; // 3
        this.schema[6][10] = {type: TYPES.GATE, zero: true};

        this.schema[8][1] = {type: TYPES.GATE, zero: true};
        this.schema[8][2] = {type: TYPES.GATE, zero: false}; // 7
        this.schema[9][3] = {type: TYPES.GATE, zero: false}; // 6
        this.schema[9][4] = {type: TYPES.GATE, zero: true};

        this.schema[8][9] = {type: TYPES.GATE, zero: true};
        this.schema[8][8] = {type: TYPES.GATE, zero: false}; // 4
        this.schema[9][7] = {type: TYPES.GATE, zero: false}; // 5
        this.schema[9][6] = {type: TYPES.GATE, zero: true};

        // this.schema[0][7] = {type: TYPES.UNDEF};
        // this.schema[0][8] = {type: TYPES.UNDEF};
        // this.schema[0][9] = {type: TYPES.UNDEF};
        // this.schema[1][0] = {type: TYPES.UNDEF};
        // this.schema[1][1] = {type: TYPES.UNDEF};
        // this.schema[1][9] = {type: TYPES.UNDEF};

    }

    init(stones) {
        this.initSchema();
        // this.gates = [];
        this.tiles = this.schema.map((schemaLine, i) => {
            return schemaLine.map((schema, j) => {
                let tile = null;
                switch (schema.type) {
                    case TYPES.UNDEF:
                        tile = new Base(this.ctx);
                        break;
                    case TYPES.SIDE:
                        tile = new SideTile(this.ctx, schema.rotation);
                        // this.emeralds.push(new Emerald(this.ctx, tile, row, col, tile.get_gate));
                        break;
                    case TYPES.CENTRAL:
                        tile = new CentralTile(this.ctx);
                        break;
                    case TYPES.GATE:
                        tile = new GateTile(this.ctx, schema.zero);
                        break;
                    default:
                        tile = new TileWithWays(this.ctx);
                }

                tile.x = 1.5 * j * TILE_SIZE.x;
                if (j % 2 === 0) {
                    tile.y = (i * 2 + 1) * TILE_SIZE.y;
                } else {
                    tile.y = (i * 2) * TILE_SIZE.y;
                }
                tile.x += TILE_SIZE.x;

                return tile;
            })
        });
        // for (let i = 0; i < ROWS_COUNT; i++) {
        //     this.tiles.push([]);
        //     for (let j = 0; j < COLUMNS_COUNT; j++) {
        //         let tile = null;
        //         switch (this.schema[i][j].type) {
        //             case TYPES.UNDEF:
        //                 tile = new Base(this.ctx);
        //                 break;
        //             case TYPES.SIDE:
        //                 tile = new SideTile(this.ctx, this.schema[i][j].rotation);
        //                 // this.emeralds.push(new Emerald(this.ctx, tile, row, col, tile.get_gate));
        //                 break;
        //             case TYPES.CENTRAL:
        //                 tile = new CentralTile(this.ctx);
        //                 break;
        //             case TYPES.GATE:
        //                 tile = new GateTile(this.ctx, this.schema[i][j].zero);
        //                 break;
        //             default:
        //                 tile = new TileWithWays(this.ctx);
        //         }
        //         // if (j !== 0) {
        //         //     tile.x = 1.5 * j * TILE_SIZE.x;
        //         // } else {
        //         //     tile.x = j * 2 * TILE_SIZE.x;
        //         // }
        //         tile.x = 1.5 * j * TILE_SIZE.x;
        //         if (j % 2 === 0) {
        //             tile.y = (i * 2 + 1) * TILE_SIZE.y;
        //         } else {
        //             tile.y = (i * 2) * TILE_SIZE.y;
        //         }
        //         tile.x += TILE_SIZE.x;
        //         this.tiles[i].push(tile);
        //     }
        // }

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

        this.stones = stones.map(stone => new Emerald(this.ctx, stone.gate, this.tiles[stone.row][stone.col], stone.type));

        // stones.forEach(stone => {
        //     this.stones.push(new Emerald(this.ctx, stone.gate, this.tiles[stone.row][stone.col], stone.type));
        // });
    }

    setGates() {
        // const colors = ['green', 'blue'];
        this.gates.forEach((gate, i) => gate.color = i % 4 > 1 ? 'green' : 'blue');
        // for (let i = 0; i < this.gates.length; i++) {
        //     if (i % 4 > 1) {
        //         this.gates[i].color = 'green';
        //         // this.gates[i].player = players[0];
        //     } else {
        //         this.gates[i].color = 'blue';
        //         // this.gates[i].player = players[1];
        //     }
        // }
    }

    getTile(x, y) {
        x -= TILE_SIZE.x;
        const j = Math.round(x / 1.5 / TILE_SIZE.x);
        const i = j % 2 === 0 ? Math.round((y / TILE_SIZE.y - 1) / 2) : Math.round(y / TILE_SIZE.y / 2);
        let tile = this.tiles[i][j];
        tile.row = i;
        tile.col = j;

        return tile;

        // if (j !== 0) {
        //     tile.x = 1.5 * j * TILE_SIZE.x;
        // } else {
        //     tile.x = j * 2 * TILE_SIZE.x;
        // }
        // if (j % 2 === 0) {
        //     tile.y = (i * 2 + 1) * TILE_SIZE.y;
        // } else {
        //     tile.y = (i * 2) * TILE_SIZE.y;
        // }
        // tile.x += TILE_SIZE.x;
    }

    // getTiles() {
    //     // console.log('TileMap: render');
    //     return this.tiles;
    // }

    // //
    // setup() {
    //     console.log('TileMap: setup');
    //     this.tiles[0].setup();
    //     this.tiles[1].setup();
    //     // this.tiles[0][2].setup();
    //     // this.tiles[0][3].setup();
    //     // this.tiles[0][4].setup();
    //     // this.tiles[0].forEach(function (item) {
    //     //         //     item.setup();
    //     //         // });
    //     // this.tiles[0][0].setup();
    //     // for (let i = 0; i < 16; i++ ){
    //     //     this.tiles[i].forEach(function (item) {
    //     //         item.setup();
    //     //     });
    //     // }
    // }
}