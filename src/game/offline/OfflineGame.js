import Player from "./gameObjects/Player.js";
import {TILES} from "../config.js";
import TileMap from "./gameObjects/TileMap.js";
import {FROM_GATES_MOVEMENT} from "../config.js";
import GateTile from "./gameObjects/GateTile.js";
import Bot from "./gameObjects/Bot.js";
import {EVENTS} from "../../constants.js";


const USER_ID = 0;
const BOT_ID = 1;
const BOT_DELAY = 1000; //msec

export default class OfflineGame {
    constructor(emit) {
        this.emitGameStart = data => emit({data: data, event: EVENTS.GAME_START});
        this.emitNextTry = data => emit({data: data, event: EVENTS.NEXT_TRY});
        this.emitWrongTry = data => emit({data: data, event: EVENTS.WRONG_TRY});

        this.currentPlayer = USER_ID;

        this.players = [new Player(USER_ID, 'nickname', ''), new Bot(BOT_ID)];

        this._setTileStack();
        this.tileMap = new TileMap();
        this.tileMap.init();

        this.bot = this.players.filter(player => player.id === BOT_ID)[0];
        this.bot.setGame(this.tileMap);

        this.lastTry = null;
    }

    readyToPlay() {
        this.emitGameStart(this._getReadyToPlayData());
        this.emitNextTry(this._getNexTryData());
    }

    doneTry(data) {
        if (this.tileMap.tiles[data.row][data.col].settled) {
            this.emitWrongTry(); // TODO: message
            return;
        }
        this.tileMap.tiles[data.row][data.col].setType(this.currentTileType);
        this.tileMap.tiles[data.row][data.col].setRotation(data.rotationCount);

        const tile = this.tileMap.tiles[data.row][data.col];
        const typeOfMovement = data.col % 2;
        const movement = FROM_GATES_MOVEMENT[typeOfMovement];

        for (let i = 0; i < tile.gates.length; i++) {
            const neighbor1 = this.tileMap.tiles[data.row + movement[i].row][data.col + movement[i].col];
            const neighbor2 = this.tileMap.tiles[data.row + movement[tile.gates[i]].row][data.col + movement[tile.gates[i]].col];
            if (neighbor1 instanceof GateTile && neighbor1.zero === false &&
                neighbor2 instanceof GateTile && neighbor2.zero === false) {
                this.emitWrongTry();
                return;
            }
        }
        tile.settled = true;

        this._setLastTry(data);

        const nextTryData = this._getNexTryData();
        this.emitNextTry(nextTryData);

        // Bot's try
        setTimeout(nextTryData => {
            const tileFromBot = this.bot.getNextTile(nextTryData);
            this.tileMap.tiles[tileFromBot.row][tileFromBot.col].setType(this.currentTileType);
            this.tileMap.tiles[tileFromBot.row][tileFromBot.col].setRotation(tileFromBot.rotation);
            this.tileMap.tiles[tileFromBot.row][tileFromBot.col].settled = true;
            this._setLastTry(tileFromBot);
            this.emitNextTry(this._getNexTryData());
        }, BOT_DELAY, nextTryData);
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
}