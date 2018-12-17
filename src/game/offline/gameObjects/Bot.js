import Player from "./Player.js";
import TileWithWays from "./TileWithWays.js";
import GateTile from "./GateTile.js";
import {ROWS_COUNT, COLUMNS_COUNT, FROM_GATES_MOVEMENT} from "../../config.js";
import {BOT_AVATAR_PATH} from "../../../constants.js";

export default class Bot extends Player {
    constructor(id) {
        super(id);
        this.id = id;
        this.nickname = 'Bot ' + id;
        this.avatar = BOT_AVATAR_PATH;
    }

    setGame(tileMap) {
        this.tileMap = tileMap;
    }

    static randomInteger(min, max) {
        let rand = min + Math.random() * (max - min);
        rand = Math.floor(rand);
        return rand;
    }

    getNextTile(nextTryData) {
        const type = nextTryData.currentTry.tileType;
        let tempTile = new TileWithWays();
        tempTile.setType(type);

        let row = Bot.randomInteger(0, ROWS_COUNT);
        let col = Bot.randomInteger(0, COLUMNS_COUNT);
        let rotationCount = 0;
        while (true) {
            const tile = this.tileMap.tiles[row][col];

            if (tile instanceof TileWithWays && tile.settled === false) {
                const typeOfMovement = col % 2;
                const movement = FROM_GATES_MOVEMENT[typeOfMovement];
                for (let k = 0; k < tempTile.gates.length; k++) {
                    const neighbor1 = this.tileMap.tiles[row + movement[k].row][col + movement[k].col];
                    const neighbor2 = this.tileMap.tiles[row + movement[tempTile.gates[k]].row][col + movement[tempTile.gates[k]].col];

                    if (neighbor1 instanceof GateTile && neighbor1.zero === false &&
                        neighbor2 instanceof GateTile && neighbor2.zero === false) {
                        rotationCount = 1;
                        return {
                            row: row,
                            col: col,
                            rotationCount: rotationCount,
                        };
                    }
                }
                return {
                    row: row,
                    col: col,
                    rotationCount: rotationCount,
                };
            }
            col += 1;
            row += (col / COLUMNS_COUNT) === 1 ? 1: 0;
            col %= COLUMNS_COUNT;
            row %= ROWS_COUNT;
        }
    }
}