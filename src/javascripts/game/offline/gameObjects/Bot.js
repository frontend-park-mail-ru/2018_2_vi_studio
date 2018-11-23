import Player from "../../client/Player.js";
import {ROWS_COUNT} from "../../client/gameConfig.js";
import {COLUMNS_COUNT} from "../../client/gameConfig.js";
import TileWithWays from "./TileWithWays.js";
import GateTile from "./GateTile.js";
import {FROM_GATES_MOVEMENT} from "../../client/gameConfig.js";

export default class Bot extends Player {
    constructor(id) {
        super(id);
        this.id = id;
        this.nickname = 'Bot';
        this.avatar = '';
        // this.active = false;
    }

    setGame(tileMap) {
        this.tileMap = tileMap;
    }

    getNextTile(type) {
        let tempTile = new TileWithWays();
        tempTile.setType(type);
        for (let i = 0; i < ROWS_COUNT; i++) {
            for (let j = 0; j < COLUMNS_COUNT; j++) {
                const tile = this.tileMap.tiles[i][j];

                if (tile instanceof TileWithWays && tile.settled === false) {
                    const typeOfMovement = j % 2;
                    const movement = FROM_GATES_MOVEMENT[typeOfMovement];
                    for (let k = 0; k < tempTile.gates.length; k++) {
                        const neighbor1 = this.tileMap.tiles[i + movement[k].row][j + movement[k].col];
                        const neighbor2 = this.tileMap.tiles[i + movement[tempTile.gates[k]].row][j + movement[tempTile.gates[k]].col];

                        if (neighbor1 instanceof GateTile && neighbor1.zero === false &&
                            neighbor2 instanceof GateTile && neighbor2.zero === false) {
                            return {
                                row: i,
                                col: j,
                                rotationCount: 1,
                            };
                        }

                    }
                    return {
                        row: i,
                        col: j,
                        rotationCount: 0,
                    };
                }
            }
        }
    }
}