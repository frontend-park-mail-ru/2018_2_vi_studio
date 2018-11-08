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
// {
//     0: {count: 6},
//     1: {count: 14},
//     2: {count: 14},
//     3: {count: 6},
//     4: {count: 14},
// };