import {GameCore} from "./GameCore.js";
import {EVENTS} from "./events.js";
import bus from "../../../bus.js";
import {TILE_SIZE} from "../tileSpec.js";
// import {GameServise} from "../../GameService.js";
import TileSelectScene from "../game-scenes/TileSelectScene.js";
import Player from "../Player.js";
import {TileWithWays} from "../graphics/TileWithWays.js";

const events = EVENTS;

// const rand = require('rand');

class GameCoreImpl extends GameCore {
    constructor(controller, scene) {
        super(controller, scene);
        this.userId = null;
        this.currentPlayerIndex = 0;
        this.playersQueue = null;
        this.tilesStack = null;
        const miniCanvas = document.getElementById('mini-canvas');
        this.tileSelectScene = new TileSelectScene(miniCanvas);


        const player1 = document.getElementById('player1');
        const player2 = document.getElementById('player2');
        console.log(player1);
        this.players = [
            {object: new Player(), element: player1,},
            {object: new Player(), element: player2,},
        ];

        this.state = {};

    }

    start() {
        super.start();
        bus.emit('game-event-ReadyToPlay', {});
    }

    onMouseClicked(evt) {
        console.log(this.players[this.currentPlayerIndex].object.id, this.userId);
        const currentPlayer = this.players[this.currentPlayerIndex].object;
        if (currentPlayer.id === this.userId && currentPlayer.active) {
            console.log('Event: MOUSE1_CLICKED - ', evt);

            const ctx = this.scene.ctx;
            const tiles = this.scene.tileMap.tiles;
            let x = (evt.pageX - this.scene.canvas.offsetLeft) * this.scene.canvas.height / this.scene.canvasRectLen;
            let y = (evt.pageY - this.scene.canvas.offsetTop) * this.scene.canvas.height / this.scene.canvasRectLen;
            for (let i = 0; i < this.scene.tileMap.rows; i++) {
                for (let j = 0; j < this.scene.tileMap.columns; j++) {
                    if ((tiles[i][j] instanceof TileWithWays) &&
                        (!tiles[i][j].ways) &&
                        (TILE_SIZE.x * TILE_SIZE.x >
                            (tiles[i][j].x - x) * (tiles[i][j].x - x) + (tiles[i][j].y - y) * (tiles[i][j].y - y))) {

                        ctx.beginPath();
                        ctx.arc(x, y, 5, 0, 2 * Math.PI);
                        ctx.lineWidth = 5;
                        ctx.strokeStyle = this.color;
                        ctx.stroke();
                        let text = i + " " + j;
                        ctx.fillText(text, x + 10, y);
                        ctx.closePath();
                        console.log(i, j);
                        console.log(this.scene.tileMap.tiles[i][j]);
                        if (this.tileSelectScene.selectedTile) {
                            this.tileSelectScene.selectedTile.setType(null);
                            this.tileSelectScene.selectedTile.fillStyle = 'yellow';
                        }
                        this.tileSelectScene.selectedTile = this.scene.tileMap.tiles[i][j];
                        this.tileSelectScene.selectedTile.row = i;
                        this.tileSelectScene.selectedTile.col = j;

                        this.tileSelectScene.selectedTile.fillStyle = 'orange';
                        this.tileSelectScene.selectedTile.setType(this.tileSelectScene.tile.type);
                        this.tileSelectScene.selectedTile.setRotation(this.tileSelectScene.tile.rotationCount);
                        bus.emit(events.GAME_STATE_CHANGED, this.state);
                        return;
                    }
                }
            }
        }
    }

    onGameStarted(data) {
        alert('Game Started');
        this.controller.start();
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].id = data.players[i].id;
            this.players[i].element.innerText = data.players[i].username;
            this.players[i].object.username = data.players[i].username;
            this.players[i].object.id = data.players[i].id;
            this.players[i].object.avatar = data.players[i].avatar;
            this.players[i].object.active = false;
        }
        this.userId = data.userId;
        this.scene.init(data);
        this.tileSelectScene.init(data);
        this.scene.start();
        this.tileSelectScene.start();
        this.scene.tileMap.setGates(this.players);
    }

    onGameFinished(evt) {

        bus.emit('Event: CLOSE_GAME');
    }

    onGameStateChanged(evt) {
        console.log('StateChanged');
        this.scene.setState(evt);
        // this.tileSelectScene.setState(evt);
        this.scene.renderScene();
        // this.tileSelectScene.renderScene();
    }


    onNextTry(evt) {
        console.log('onNext', evt);
        if (evt.currentTry.playerId) {
            this.players.forEach(player => {
                player.object.active = false;
                player.element.setAttribute('style', 'font-style: normal');
            });
            for (let i = 0; i < this.players.length; i++) {
                if (this.players[i].object.id === evt.currentTry.playerId) {
                    this.players[i].object.active = true;
                    this.players[i].element.setAttribute('style', 'font-style: normal');
                }
            }
            this.tileSelectScene.tile.setType(evt.currentTry.tileType);
            this.tileSelectScene.renderScene();
        } else {
            this.players.forEach(player => player.object.active = false);
        }
    }
}

export default GameCoreImpl;