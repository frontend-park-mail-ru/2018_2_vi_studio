import {COLUMNS_COUNT, ROWS_COUNT, TYPES_ON_MAP} from "../../config";

class MapSchema {
    constructor() {
        this.schema = [];
        this.rows = ROWS_COUNT;
        this.columns = COLUMNS_COUNT;
        for (let i = 0; i < ROWS_COUNT; i++) {
            this.schema.push([]);
            for (let j = 0; j < COLUMNS_COUNT; j++) {
                this.schema[i].push(TYPES_ON_MAP.STD);
            }
        }
        this._setUndefTiles();
        this._setSidesTiles();
        this._setCentralTile();
        this._setGateTiles();
    }

    _setUndefTiles() {
        for (let i = 0; i < 4; i++) {
            this.schema[0][i] = {type: TYPES_ON_MAP.UNDEF};
        }

        this.schema[0][5] = {type: TYPES_ON_MAP.UNDEF};

        for (let i = 7; i < 9; i++) {
            this.schema[0][i] = {type: TYPES_ON_MAP.UNDEF};
        }

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
        let centralRow = Math.floor(this.rows / 2);
        let centralColumn = Math.floor(this.columns / 2);
        this.schema[1][centralColumn] = {
            type: TYPES_ON_MAP.SIDE,
            rotationCount: 3,
        };
        this.schema[ROWS_COUNT - 1][centralColumn] = {
            type: TYPES_ON_MAP.SIDE,
            rotationCount: 0,
        };
        this.schema[centralRow + centralRow - 3][centralColumn + centralRow - 1] = {
            type: TYPES_ON_MAP.SIDE,
            rotationCount: 5,
        };
        this.schema[centralRow + centralRow - 3][1] = {
            type: TYPES_ON_MAP.SIDE,
            rotationCount: 1,
        };
        this.schema[3][9] = {
            type: TYPES_ON_MAP.SIDE,
            rotationCount: 4,
        };
        this.schema[3][1] = {
            type: TYPES_ON_MAP.SIDE,
            rotationCount: 2,
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
    }
}
export default new MapSchema();