import {GameCore} from "./GameCore.js";
import EVENTS from "../../../events.js";
import bus from "../../../bus.js";
import {TILE_SIZE} from "../tileSpec.js";
// import TileSelectScene from "../game-scenes/TileSelectScene.js";
import Player from "../Player.js";
import {TileWithWays} from "../graphics/TileWithWays.js";
import GameScene from "../game-scenes/GameScene.js";
import Component from "../../../components/Component.js";
import TileSelectScene from "../game-scenes/TileSelectScene.js";

class GameCoreImpl extends GameCore {
    constructor(component) {
        super();

        this.boardScene = new GameScene(component.boardCanvas);
        this.tileScene = new TileSelectScene(component.tileCanvas);
        this.playersRoot = component.playersRoot;

        this.rotateButton = component.rotateButton;
        this.rotateButton.addEventListener('click', this.tileScene.rotate);

        this.submitButton = component.submitButton;
        this.submitButton.addEventListener('click', this.tileScene.submit);

        this.userId = null;
        this.currentPlayerIndex = 0;

        this.state = {};
    }

    start() {
        super.start();
        bus.emit('game-event-ReadyToPlay', {});
    }

    onMouseClicked(evt) {
        console.log(this.players[this.currentPlayerIndex].id, this.userId);
        const currentPlayer = this.players[this.currentPlayerIndex];
        if (currentPlayer.id === this.userId && currentPlayer._active) {
            console.log('Event: MOUSE1_CLICKED - ', evt);

            const ctx = this.boardScene.ctx;
            const tiles = this.boardScene.tileMap.tiles;
            let x = (evt.pageX - this.boardScene.canvas.offsetLeft) * this.boardScene.canvas.height / this.boardScene.canvasRectLen;
            let y = (evt.pageY - this.boardScene.canvas.offsetTop) * this.boardScene.canvas.height / this.boardScene.canvasRectLen;
            for (let i = 0; i < this.boardScene.tileMap.rows; i++) {
                for (let j = 0; j < this.boardScene.tileMap.columns; j++) {
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
                        console.log(this.boardScene.tileMap.tiles[i][j]);
                        if (this.tileScene.selectedTile) {
                            this.tileScene.selectedTile.setType(null);
                            this.tileScene.selectedTile.fillStyle = 'yellow';
                        }
                        this.tileScene.selectedTile = this.boardScene.tileMap.tiles[i][j];
                        this.tileScene.selectedTile.row = i;
                        this.tileScene.selectedTile.col = j;

                        this.tileScene.selectedTile.fillStyle = 'orange';
                        this.tileScene.selectedTile.setType(this.tileScene.tile.type);
                        this.tileScene.selectedTile.setRotation(this.tileScene.tile.rotationCount);
                        bus.emit(EVENTS.GAME_STATE_CHANGED, this.state);
                        return;
                    }
                }
            }
        }
    }

    onGameStarted(data) {
        alert('Game Started');

        this.players = data.players.map(player => {
            const result = new Player(player.id, player.username, player.avatar);
            Component.render(result.component, this.playersRoot);
            return result;
        });

        console.log(this.players);

        this.userId = data.userId;
        this.boardScene.init(data);
        this.tileScene.init(data);
        this.boardScene.start();
        this.tileScene.start();
        this.boardScene.tileMap.setGates(this.players);
    }

    onGameFinished(evt) {
        bus.emit('Event: CLOSE_GAME');
    }

    onGameStateChanged(evt) {
        console.log('StateChanged');
        this.boardScene.setState(evt);
        // this.tileScene.setState(evt);
        this.boardScene.renderScene();
        // this.tileScene.renderScene();
    }


    onNextTry(evt) {
        console.log('onNext', evt);
        if (evt.currentTry.playerId) {
            this.players.forEach(
                player => evt.currentTry.playerId === player.id ? player.activate() : player.deactivate()
            );

            this.tileScene.tile.setType(evt.currentTry.tileType);
            this.tileScene.renderScene();
        } else {
            this.players.forEach(player => player.deactivate());
        }
    }
}

export default GameCoreImpl;