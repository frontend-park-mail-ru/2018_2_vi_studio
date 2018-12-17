import Player from "./gameObjects/Player.js";
import {TILES} from "../config.js";
import TileMap from "./gameObjects/TileMap.js";
import {FROM_GATES_MOVEMENT} from "../config.js";
import GateTile from "./gameObjects/GateTile.js";
import Bot from "./gameObjects/Bot.js";
import SideTile from "./gameObjects/SideTile.js";
import CentralTile from "./gameObjects/CentralTile.js";
import TileWithWays from "./gameObjects/TileWithWays.js";
import {EVENTS} from "../../constants.js";


const USER_ID = 0;
const BOT_ID = 1;

export default class OfflineGame {
    constructor(emit) {
        this.emitGameStart = data => emit({data: data, event: EVENTS.GAME_START});
        this.emitNextTry = data => emit({data: data, event: EVENTS.NEXT_TRY});
        this.emitWrongTry = data => emit({data: data, event: EVENTS.WRONG_TRY});

        this.currentPlayer = USER_ID;

        //    GameObjects
        this.players = [new Player(USER_ID, 'nickname', ''), new Bot(BOT_ID)];
        this._setTileStack();
        this.tileMap = new TileMap();
        this.tileMap.init();
        this.bot = new Bot();
        this.bot.setGame(this.tileMap);
        this.lastTry = null;
    }

    readyToPlay() {
        this.emitGameStart(this._getReadyToPlayData());
        this.emitNextTry(this._getNexTryData());
    }

    doneTry(data) {
        // TODO: checking
        if (this.tileMap.tiles[data.row][data.col].settled) {
            this.emitWrongTry(); // TODO: message
            return;
        }
        this.tileMap.tiles[data.row][data.col].setType(this.currentTileType);
        this.tileMap.tiles[data.row][data.col].setRotation(data.rotationCount);

        const tile = this.tileMap.tiles[data.row][data.col];
        const typeOfMovement = data.col % 2;
        const movement = FROM_GATES_MOVEMENT[typeOfMovement];

        let canGetStone = null;
        for (let i = 0; i < tile.gates.length; i++) {
            const neighbor1 = this.tileMap.tiles[data.row + movement[i].row][data.col + movement[i].col];
            const neighbor2 = this.tileMap.tiles[data.row + movement[tile.gates[i]].row][data.col + movement[tile.gates[i]].col];
            if (neighbor1 instanceof GateTile && neighbor1.zero === false &&
                neighbor2 instanceof GateTile && neighbor2.zero === false) {
                // console.log("Gatessss ", data.row + movement[i].row, data.col + movement[i].col, "-", tile.gates[i]);
                this.emitWrongTry();
                canGetStone = null;
                return;
            }

        }
        tile.settled = true;

        this.moveStones();
        this._setLastTry(data);
        const nextTryData = this._getNexTryData();
        this.emitNextTry(nextTryData);
        const tileFromBot = this.bot.getNextTile(nextTryData.currentTry.tileType); //TODO:
        this.tileMap.tiles[tileFromBot.row][tileFromBot.col].setType(this.currentTileType);
        this.tileMap.tiles[tileFromBot.row][tileFromBot.col].setRotation(tileFromBot.rotation);
        this.tileMap.tiles[tileFromBot.row][tileFromBot.col].settled = true;
        this.moveStones();
        this._setLastTry(tileFromBot);

        this.emitNextTry(this._getNexTryData());
    }

    moveStones() {
        this.tileMap.stones.forEach((stone, i) => {
            const typeOfMovement = stone.col % 2;
            const movement = FROM_GATES_MOVEMENT[typeOfMovement];
            if (stone.tile instanceof SideTile && stone.tile.stoneGate === stone.gate) {
                const tile = this.tileMap.tiles[stone.row + movement[stone.tile.stoneGate].row][stone.col + movement[stone.tile.stoneGate].col];
                //stone.col + movement[stone.tile.stoneGate].col
                if (tile.settled) {
                    stone.gate = movement[stone.tile.stoneGate].gate; // стоит на входе тайла

                    stone.row += movement[stone.tile.stoneGate].row;
                    stone.col += movement[stone.tile.stoneGate].col;

                    // this.check TODO: CHECK
                    if (this.tileMap.haveCollisions(i)) {
                        return;
                    }
                    stone.gate = tile.gates[stone.gate]; // стоит на выходе из тайла
                    stone.tile = tile;
                }

            } else if (stone.tile instanceof CentralTile) {
                // debugger;
                const tile = this.tileMap.tiles[stone.row + movement[stone.gate].row][stone.col + movement[stone.gate].col];
                if (tile.settled) {
                    stone.row += movement[stone.gate].row;
                    stone.col += movement[stone.gate].col;
                    stone.gate = movement[stone.gate].gate; // стоит на входе тайла
                    // this.check TODO: CHECK
                    if (this.tileMap.haveCollisions(i)) {
                        return;
                    }
                    stone.gate = tile.gates[stone.gate]; // стоит на входе тайла
                    stone.tile = tile;

                    // stone.tile = tile.stonesOnGate[movement[j].gate];
                }
            }
        });

        this.tileMap.stones.forEach((stone, i) => {
            for (; ;) {
                const typeOfMovement = stone.col % 2;
                const movement = FROM_GATES_MOVEMENT[typeOfMovement];
                if (!stone.isOutOfGame && (stone.tile instanceof TileWithWays || stone.tile instanceof SideTile)) {
                    // stone.gate = stone.tile.gates[stone.gate];
                    // let gate = movement[stone.gate];
                    // let row = stone.row + movement[stone.gate].row;
                    // let col = stone.col + movement[stone.gate].col;
                    let neighbor = this.tileMap.tiles[stone.row + movement[stone.gate].row][stone.col + movement[stone.gate].col];
                    if (neighbor instanceof TileWithWays && neighbor.settled === false) {
                        break;
                    } else if (neighbor instanceof TileWithWays && neighbor.settled === true || neighbor instanceof SideTile) {
                        stone.tile = neighbor;
                        // let m = movement[stone.gate].row;
                        // let n = movement[stone.gate].col;
                        stone.row += movement[stone.gate].row;
                        stone.col += movement[stone.gate].col;
                        stone.gate = movement[stone.gate].gate; // на входе
                        // проверка
                        if (this.tileMap.haveCollisions(i)) {
                            break;
                        }
                        stone.gate = neighbor.gates[stone.gate]; // на выходе
                    } else if (neighbor instanceof GateTile) {
                        if (neighbor.zero) {
                            stone.isOutOfGame = true;
                            break;
                        } else {
                            const playerIndex = neighbor.gates[movement[stone.gate].gate];
                            this.players[playerIndex].points += stone.type;
                            stone.isOutOfGame = true;
                            break;
                        }

                    } else {
                        break;
                    }

                } else {
                    break;
                }
            }

        });
    }

    _setLastTry(data) {
        this.lastTry = data;
        this.lastTry.type = this.currentTileType;
    }

    _getReadyToPlayData() {

        return {
            players: this.players,
            userId: USER_ID,
            stones: this.tileMap.stones,
        };
    }

    _getNexTryData() {
        this.currentTileType = this.tileStack.pop();

        const data = {
            lastTry: {},
            currentTry: {
                playerId: this.currentPlayer,
                tileType: this.currentTileType,
            },
            gameOver: {},
            stones: this.tileMap.stones,
        };

        if (this.tileMap.stones.filter(stone => !stone.isOutOfGame).length === 0) {
            debugger;
            data.gameOver = {players: this.players};
        }


        if (this.lastTry) {
            data.lastTry = this.lastTry;
        }

        if (this.currentPlayer === USER_ID) {
            this.currentPlayer = BOT_ID;
        } else {
            this.currentPlayer = USER_ID;
        }

        return data;
    };

    _setTileStack() {
        this.tileStack = []
            .concat.apply([], TILES.map((count, i) => Array(count).fill(i)))
            .sort(() => Math.random() - 0.5);
    }

    stop() {

    }
}