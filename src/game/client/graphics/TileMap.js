import TileWithWays from "./TileWithWays.js";
import SideTile from "./SideTile.js";
import CentralTile from "./CentralTile.js";
import GateTile from "./GateTile.js";
import Stone from "./Stone.js";
import {TILE_SIZE, STONE_TYPES, FROM_GATES_MOVEMENT} from "../../config.js";
import bus from "../../../bus";
import {EVENTS} from "../../../constants";

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
    constructor(players) {
        this.players = players;
        this.tiles = [];
        this.gateTiles = [];
        this.rows = ROWS_COUNT;
        this.columns = COLUMNS_COUNT;
        this.stones = [];

        this.moveStones = this.moveStones.bind(this);
        this.haveCollisions = this.haveCollisions.bind(this);
        this._moveStone = this._moveStone.bind(this);


        this.initSchema();
        this.setGates(players);
        this.initTiles();
    }

    initSchema() {
        this.schema = [];
        for (let i = 0; i < ROWS_COUNT; i++) {
            this.schema.push(new Array(COLUMNS_COUNT).fill(TYPES.STD));
        }

        this._setUndefTiles();
        this._setSidesTiles();
        this._setCentralTile();
        this._setGateTiles();
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
            rotationCount: 3,
        };
        this.schema[ROWS_COUNT - 1][centralColumn] = {
            type: TYPES.SIDE, rotation: 0,
            rotationCount: 0,
        };
        this.schema[centralRow + centralRow - 3][centralColumn + centralRow - 1] = {
            type: TYPES.SIDE,
            rotation: Math.PI / 3 * 5,
            rotationCount: 5,
        };
        this.schema[centralRow + centralRow - 3][1] = {
            type: TYPES.SIDE,
            rotation: Math.PI / 3,
            rotationCount: 1,
        };
        this.schema[3][9] = {
            type: TYPES.SIDE,
            rotation: Math.PI / 3 * 4,
            rotationCount: 4,
        };
        this.schema[3][1] = {
            type: TYPES.SIDE,
            rotation: Math.PI / 3 * 2,
            rotationCount: 2,
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
    }

    initTiles() {
        this.tiles = this.schema.map((schemaLine, i) => {
            return schemaLine.map((schema, j) => {
                let tile = null;

                const x = 1.5 * (j + 1) * TILE_SIZE.x;
                const y = j % 2 === 0 ? (i * 2 + 1) * TILE_SIZE.y : i * 2 * TILE_SIZE.y;

                switch (schema.type) {
                    case TYPES.UNDEF:
                        return null;
                    case TYPES.SIDE:
                        tile = new SideTile(schema.rotationCount, x, y);
                        this.stones.push(new Stone(STONE_TYPES.YELLOW, tile, i, j, schema.rotationCount));
                        break;
                    case TYPES.CENTRAL:
                        tile = new CentralTile(x, y);
                        for (let k = 0; k < 6; k++) {
                            this.stones.push(new Stone(STONE_TYPES.GREEN, tile, i, j, k));
                        }
                        break;
                    case TYPES.GATE:
                        tile = new GateTile(schema.zero, x, y);
                        break;
                    default:
                        tile = new TileWithWays(x, y);
                }
                return tile;
            });
        });


        this.gateTiles.push(this.tiles[1][7]);
        this.gateTiles[0].gates = [null, null, null, 0, 0, null];

        this.gateTiles.push(this.tiles[1][8]);
        this.gateTiles[1].gates = [null, null, null, 0, 0, null];

        this.gateTiles.push(this.tiles[4][10]);
        this.gateTiles[2].gates = [null, null, null, null, 1, 1];

        this.gateTiles.push(this.tiles[5][10]);
        this.gateTiles[3].gates = [null, null, null, null, 1, 1];

        this.gateTiles.push(this.tiles[8][8]);
        this.gateTiles[4].gates = [0, null, null, null, null, 0];

        this.gateTiles.push(this.tiles[9][7]);
        this.gateTiles[5].gates = [0, null, null, null, null, 0];

        this.gateTiles.push(this.tiles[9][3]);
        this.gateTiles[6].gates = [1, 1, null, null, null, null];

        this.gateTiles.push(this.tiles[8][2]);
        this.gateTiles[7].gates = [1, 1, null, null, null, null];

        this.gateTiles.push(this.tiles[5][0]);
        this.gateTiles[8].gates = [null, 0, 0, null, null, null];

        this.gateTiles.push(this.tiles[4][0]);
        this.gateTiles[9].gates = [null, 0, 0, null, null, null];

        this.gateTiles.push(this.tiles[1][2]);
        this.gateTiles[10].gates = [null, null, 1, 1, null, null];

        this.gateTiles.push(this.tiles[1][3]);
        this.gateTiles[11].gates = [null, null, 1, 1, null, null];
    }

    setGates(players) {
        this.gateTiles.forEach((gate, i) => {
            if (i % 4 > 1) {
                gate.color = 'green';
                gate.player = players[0];
            } else {
                gate.color = 'blue';
                gate.player = players[1];
            }
        });
    }

    getTile(x, y) {
        const j = Math.round(x / 1.5 / TILE_SIZE.x) - 1;
        const i = j % 2 === 0 ? Math.round((y / TILE_SIZE.y - 1) / 2) : Math.round(y / TILE_SIZE.y / 2);
        let tile = this.tiles[i][j];
        tile.row = i;
        tile.col = j;

        return tile;

    }

    haveCollisions(stoneToCheck) {
        const collisionStones = this.stones
            .filter(stone => stone.gate === stoneToCheck.gate && stone.row === stoneToCheck.row && stone.col === stoneToCheck.col);
        if (collisionStones.length > 1) {
            collisionStones[0].visible = false;
            collisionStones[1].visible = false;
            this.stones = this.stones.filter(stone => stone !== collisionStones[0] && stone !== collisionStones[1]);
            this._checkGameOver();
            return true;
        }
        return false;
    }

    moveStones() {
        this.stones.filter(stone => !stone.move).forEach(stone => this._moveStone(stone));
    }

    _moveStone(stone) {
        const movement = FROM_GATES_MOVEMENT[stone.col % 2];
        const neighbor = this.tiles[stone.row + movement[stone.gate].row][stone.col + movement[stone.gate].col];

        if (neighbor instanceof GateTile) {
            if (neighbor.zero) {
                this.stones = this.stones.filter(s => s !== stone && s !== stone);
                this._checkGameOver();
                return;
            } else {
                const playerIndex = neighbor.gates[movement[stone.gate].gate];

                if (playerIndex !== undefined) {
                    this.players[playerIndex].points += stone.type;
                }
                this.stones = this.stones.filter(s => s !== stone && s !== stone);
                this._checkGameOver();
                return;
            }
        }

        if (!(neighbor && (neighbor instanceof TileWithWays && neighbor.settled || neighbor instanceof SideTile))) {
            stone.move = false;
            return
        }

        stone.move = true;
        stone.row += movement[stone.gate].row;
        stone.col += movement[stone.gate].col;
        stone.setPos(neighbor, movement[stone.gate].gate);
        bus.emit(EVENTS.GAME_STATE_CHANGED);

        setTimeout((neighbor, gate) => {
            stone.setPos(neighbor, gate);
            bus.emit(EVENTS.GAME_STATE_CHANGED);

            if (!this.haveCollisions(stone)) {
                setTimeout(this._moveStone, 200, stone);
            }

        }, 200, neighbor, neighbor.gates[stone.gate]);
    }

    _checkGameOver() {
        if (this.stones.length === 0) {
            bus.emit(EVENTS.NEXT_TRY, {gameOver: {players: this.players}, lastTry: {}, currentTry: {tileType: null}});
        }
    }
}