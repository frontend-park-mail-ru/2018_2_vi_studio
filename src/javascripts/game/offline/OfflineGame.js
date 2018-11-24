import Player from "./gameObjects/Player.js";
import {TILES} from "../client/gameConfig.js";
import TileMap from "./gameObjects/TileMap.js";
import {FROM_GATES_MOVEMENT} from "../client/gameConfig.js";
import GateTile from "./gameObjects/GateTile.js";
import Bot from "./gameObjects/Bot.js";
import SideTile from "./gameObjects/SideTile.js";
import CentralTile from "./gameObjects/CentralTile.js";
import TileWithWays from "./gameObjects/TileWithWays.js";


const USER_ID = 1;
const BOT_ID = 2;
const noop = () => {
};

export default class OfflineGame {
    constructor() {
        // this.emitQueuePosition = noop();
        this.emitGameStart = noop();
        this.emitNextTry = noop();
        this.emitWrongTry = noop();

        this.currentPlayer = USER_ID;


        //    GameObjects
        this.players = [new Player(USER_ID, 'nickname', ''), new Bot(BOT_ID)];
        this._setTileStack();
        this.tileMap = new TileMap();
        this.tileMap.init();
        this.bot = new Bot();
        this.bot.setGame(this.tileMap);
        this.stones = [];

        this.lastTry = null;
    }

    readyToPlay(data) {
        // console.log('redy to play');
        this.emitGameStart(this._getReadyToPlayData());
        this.emitNextTry(this._getNexTryData());
    }

    doneTry(data) {
        // if (/* */) {
        //     this.emitWrongTry();
        //     return
        // }
        // TODO: checking
        // console.log("DONE TRY", data);
        if (this.tileMap.tiles[data.row][data.col].settled) {
            this.emitWrongTry(); // TODO: message
            return;
        }
        this.tileMap.tiles[data.row][data.col].setType(this.currentTileType);
        this.tileMap.tiles[data.row][data.col].setRotation(data.rotation);
        // console.log("TILE", this.tileMap.tiles[data.row][data.col]);

        const tile = this.tileMap.tiles[data.row][data.col];
        const typeOfMovement = data.col % 2;
        const movement = FROM_GATES_MOVEMENT[typeOfMovement];

        let canGetStone = null;
        for (let i = 0; i < tile.gates.length; i++) {
            const neighbor1 = this.tileMap.tiles[data.row + movement[i].row][data.col + movement[i].col];
            const neighbor2 = this.tileMap.tiles[data.row + movement[tile.gates[i]].row][data.col + movement[tile.gates[i]].col];

            // if (neighbor1 instanceof SideTile && movement[i].gate === neighbor1.stoneGate || neighbor1 instanceof CentralTile ) {
            //     canGetStone = {
            //         tile: neighbor1,
            //         stoneGate: i,
            //         row: data.row,
            //         col: data.col,
            //     };
            // }
            if (neighbor1 instanceof GateTile && neighbor1.zero === false &&
                neighbor2 instanceof GateTile && neighbor2.zero === false) {
                // console.log("Gatessss ", data.row + movement[i].row, data.col + movement[i].col, "-", tile.gates[i]);
                this.emitWrongTry();
                canGetStone = null;
                return;
            }

        }
        tile.settled = true;
        // выдача камней

        const stones = this.tileMap.stones;
        for (let i = 0; i < stones.length; i++) {

            const typeOfMovement = stones[i].col % 2;
            const movement = FROM_GATES_MOVEMENT[typeOfMovement];

            if (stones[i].tile instanceof SideTile) {
                const tile = this.tileMap.tiles[stones[i].row + movement[stones[i].tile.stoneGate].row][stones[i].col + movement[stones[i].tile.stoneGate].col];
                console.log("POS", stones[i].row + movement[stones[i].tile.stoneGate].row, stones[i].col + movement[stones[i].tile.stoneGate].col);
                console.log("lay", stones[i].tile);
                //stones[i].col + movement[stones[i].tile.stoneGate].col
                if (tile.settled) {
                    stones[i].gate = movement[stones[i].tile.stoneGate].gate; // стоит на входе тайла
                    stones[i].gate = tile.gates[stones[i].gate]; // стоит на выходе из тайла
                    stones[i].row += movement[stones[i].tile.stoneGate].row;
                    stones[i].col += movement[stones[i].tile.stoneGate].col;
                    stones[i].tile = tile;

                }

            } else if (stones[i].tile instanceof CentralTile) {
                for( let j = 0; j < 6; j++) { // TODO: ADD CONST
                    console.log(this.tileMap.tiles, stones[i].row + movement[j].row);
                    let tile = this.tileMap.tiles[stones[i].row + movement[j].row][stones[i].col + movement[j].col];
                    if (tile.settled) {
                        stones[i].tile = tile;
                        stones[i].gate = tile.gates[stones[i].gate]; // перемещаю сразу к выходу из тайла
                        stones[i].row += movement[j].row;
                        stones[i].col += movement[j].col;
                        // stones[i].tile = tile.stonesOnGate[movement[j].gate];
                    }
                }
            }
        }
        console.log('here');
        // движение каменя
        for (let i = 0; i < this.tileMap.stones.length; i++) {
            let stone = this.tileMap.stones[i];
            console.log("STONE ", stone);
            for(;;) {
                if (i === 0) {

                    // debugger;
                }
                const typeOfMovement = stone.col % 2;
                const movement = FROM_GATES_MOVEMENT[typeOfMovement];
                if (!stone.isOutOfGame && stone.tile instanceof TileWithWays) {
                    // stone.gate = stone.tile.gates[stone.gate];
                    let gate = movement[stone.gate];
                    let row = stone.row + movement[stone.gate].row;
                    let col = stone.col + movement[stone.gate].col;
                    let neighbor = this.tileMap.tiles[stone.row + movement[stone.gate].row][stone.col + movement[stone.gate].col];
                    console.log("SOSED", neighbor);
                    if (neighbor instanceof TileWithWays && neighbor.settled === false) {
                        break;
                    } else if (neighbor instanceof TileWithWays && neighbor.settled === true) {
                        stone.tile = neighbor;
                        let m = movement[stone.gate].row;
                        let n = movement[stone.gate].col;
                        stone.row += movement[stone.gate].row;
                        stone.col += movement[stone.gate].col;
                        stone.gate = neighbor.gates[movement[stone.gate].gate];

                    }
                    else if (neighbor instanceof GateTile) {
                        if( neighbor.zero ) {
                            stone.isOutOfGame = true;
                            break;
                        } else {
                            const playerIndex = neighbor.gates[movement[stone.gate].gate];
                            this.players[playerIndex].points += stone.type;
                            stone.isOutOfGame = true;
                            break;
                        }

                    }

                } else {
                    break;
                }
            }

        }


        this._setLastTry(data);
        const nextTryData = this._getNexTryData();
        this.emitNextTry(nextTryData);
        const tileFromBot = this.bot.getNextTile(nextTryData.currentTry.tileType); //TODO:
        this.tileMap.tiles[tileFromBot.row][tileFromBot.col].setType(this.currentTileType);
        this.tileMap.tiles[tileFromBot.row][tileFromBot.col].setRotation(tileFromBot.rotation);
        this.tileMap.tiles[tileFromBot.row][tileFromBot.col].settled = true;
        this._setLastTry(tileFromBot);
        let inGameStones = 0;
        this.tileMap.stones.forEach(stone => {
            if (!stone.isOutOfGame) {
            inGameStones++;
            }
        });
        if (inGameStones === 0) {
            this.gameOver = {players: this.players};
        }
        this.emitNextTry(this._getNexTryData());
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
        // this.currentTileType = 4;

        const data = {
            lastTry: {},
            currentTry: {
                playerId: this.currentPlayer,
                tileType: this.currentTileType,
            },
            gameOver: {},
            stones: this.tileMap.stones,
        };

        if (this.lastTry) {
            data.lastTry = this.lastTry;
        }

        if (this.currentPlayer === USER_ID) {
            this.currentPlayer = BOT_ID;
        } else {
            this.currentPlayer = USER_ID;
        }
        // this.tileMap.stones.forEach(stone => {
        //     data.stones.push({
        //         type: stone.type,
        //         gate: stone.gate,
        //         row: stone.row,
        //         col: stone.col,
        //     });
        // });

        return data;
    };

    _setTileStack() {
        this.tileStack = []
            .concat.apply([], TILES.map((count, i) => Array(count).fill(i)))
            .sort(() => Math.random() - 0.5);
        // console.log(this.tileStack);
    }
}