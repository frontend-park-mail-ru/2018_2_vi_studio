import Player from "../client/Player.js";
import Bot from "../offline/Bot.js";
import {TileMap} from "../client/graphics/TileMap.js";
import {TILES} from "../client/tileSpec.js";


const USER_ID = 1;
const BOT_ID = 2;
const noop = () => {};

export default class OfflineGame{
    constructor() {
        // this.emitQueuePosition = noop();
        this.emitGameStart = noop();
        this.emitNextTry = noop();
        this.emitWrongTry = noop();

        this.currentPlayer = USER_ID;


    //    GameObjects
        this.players = [new Player(USER_ID, 'nickname', ''), new Bot(BOT_ID)];
        this.tileStack = [];
        this._setTileStack();
        // this.tileMap = new TileMap();
        // this.tileMap.init();
        // this.emeralds = this.tileMap.getEmeralds();
    }

    readyToPlay(data) {
        console.log('redy to play');
        this.emitGameStart(this._getReadyToPlayData());
        this.emitNextTry(this._getNexTryData());
    }

    doneTry(data) {
        // if (/* */) {
        //     this.emitWrongTry();
        //     return
        // }

        this.emitNextTry();
    }

    _getReadyToPlayData(){
        const data = {players: []};
        for( let i = 0; i < this.players.length; i++ ) {
            data.players.push(this.players[i].getData());
        }
        console.log(data);
        data['userId'] = USER_ID;
        return data;
    }

    _getNexTryData() {
        const data = {
            lastTry: {},
            currentTry: {
                playerId: this.currentPlayer,
                tileType: this.tileStack.pop(),
            },
            gameOver: {}
        };
        return data;

    };

    _setTileStack(){
        for (let i = 0; i < TILES.length; i++) {
            for (let j = 0; j < TILES[i]; j++) {
                this.tileStack.push(i);
            }
        }
    }

}