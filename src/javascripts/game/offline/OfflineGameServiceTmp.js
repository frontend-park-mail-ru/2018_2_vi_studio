import bus from '../../bus.js';
import GameRPC from "../client/GameService.js";
import Player from "../client/Player.js";
import {TILES} from "../config.js";

export default class OfflineGameService extends GameRPC{
    // TODO: implement
    constructor(tileMap) {
        super();
        this.tileMap = tileMap;
        this.players = [new Player(1, 'you', ''), new Player(666, 'Bot', '')];
        this.currentPlayerIndex = 0;
        this.tilesStack = [];
        for (let i = 0; i < TILES.length; i++) {
            for (let j = 0; j < TILES[i]; j++) {
                this.tilesStack.push(i);
            }
        }
        this.lastTile = {
            row: null,
            col: null,
            rotation: null,
        };
    }

    onMessage(event) {
        // console.log('message', event);
        bus.emit(event.event, event.data);
    }

    onReadyToPlay(data) {
        // console.log('ready_to_play');
        bus.emit('game-event-GameStart', {});

    }
    onGameStart(data) {
        let gameStartMessage = {
            playersQueue: this.players,
            id: this.players[0].id,
        };
        let message = {
            event: 'START_GAME',
            data: gameStartMessage,
        };
        bus.emit('game-event-Message', message);
        const lastTileType = this.tilesStack.pop();
        message = {
            event: 'NEXT_TRY',
            data: {
                currentTry: {
                    id: this.players[this.currentPlayerIndex].id,
                    // tile: 1,
                    tile: lastTileType,
                },
                lastTry: {
                    row: this.lastTile.row,
                    col: this.lastTile.col,
                    rotation: this.lastTile.rotationCount,
                },
                gameOver: {},
            },
        };
        this.currentPlayerIndex ++;
        this.currentPlayerIndex %= 2;
        bus.emit('game-event-Message', message);
    }

    onDoneTry(data) {
        // console.log(data);
        this.lastTile.row = data.row;
        this.lastTile.col = data.col;
        this.lastTile.rotationCount = data.rotationCount;
        const lastTileType = this.tilesStack.pop();
        // this.lastTile;
        let message = {
            event: 'NEXT_TRY',
            data: {
                currentTry: {
                    id: this.players[this.currentPlayerIndex].id,
                    // tile: 1,
                    tile: lastTileType,
                },
                lastTry: {
                    row: this.lastTile.row,
                    col: this.lastTile.col,
                    rotation: this.lastTile.rotationCount,
                },
                gameOver: {},
            },
        };
        this.currentPlayerIndex ++;
        this.currentPlayerIndex %= 2;
        bus.emit('game-event-Message', message);
    }

}