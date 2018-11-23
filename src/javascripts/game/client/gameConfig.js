const ROWS_COUNT = 10;
const COLUMNS_COUNT = 11;

const TYPES_ON_MAP = {
    UNDEF: 'UNDEF',
    GATE: 'GATE',
    CENTRAL: 'CENTRAL',
    SIDE: 'SIDE',
    STD: 'STD',
};

export const TILES = [6, 14, 14, 6, 14];

export const TILE_SIZE = {
    x: 60,
    y: Math.sin(Math.PI / 3) * 60
};

export const TYPE_WAYS = {
    0: [1, 0, 3, 2, 5, 4],
    1: [3, 2, 1, 0, 5, 4],
    2: [1, 0, 4, 5, 2, 3],
    3: [3, 4, 5, 0, 1, 2],
    4: [3, 5, 4, 0, 2, 1],
};

const SPECIAL_TILES = {
    SIDE: {
        gates: [0, 5, 0, 0, 0, 1],
        stoneGate: 0,
    },

};

const FROM_GATES_MOVEMENT = {
    0: {
        0: {
            row :-1,
            col: 0,
            gate: 3,
        },
        1: {
            row: 0,
            col: +1,
            gate: 4,
        },
        2: {
            row: +1,
            col: +1,
            gate: 5,
        },
        3: {
            row: +1,
            col: 0,
            gate: 0,
        },
        4: {
            row: +1,
            col: -1,
            gate: 1,
        },
        5: {
            row: 0,
            col: -1,
            gate: 2,
        },
    },
    1: {
        0: {
            row :-1,
            col: 0,
            gate: 3,
        },
        1: {
            row: -1,
            col: +1,
            gate: 4,
        },
        2: {
            row: 0,
            col: +1,
            gate: 5,
        },
        3: {
            row: +1,
            col: 0,
            gate: 0,
        },
        4: {
            row: 0,
            col: -1,
            gate: 1,
        },
        5: {
            row: -1,
            col: -1,
            gate: 2,
        },
    },
};

const STONE_TYPES = {
    YELLOW: 1,
    GREEN: 2,
    BLUE: 3,
};

export {ROWS_COUNT};
export {COLUMNS_COUNT};
export {TYPES_ON_MAP};
export {SPECIAL_TILES};
export {STONE_TYPES};
export {FROM_GATES_MOVEMENT};

// {
//     0: {count: 6},
//     1: {count: 14},
//     2: {count: 14},
//     3: {count: 6},
//     4: {count: 14},
// };