import {GameCore} from "./GameCore.js";
import EVENTS from "../../../events.js";
import bus from "../../../bus.js";
import {TILE_SIZE} from "../gameConfig.js";
// import TileSelectScene from "../game-scenes/TileSelectScene.js";
import Player from "../Player.js";
import {TileWithWays} from "../graphics/TileWithWays.js";
import GameScene from "../game-scenes/GameScene.js";
import Component from "../../../components/Component.js";
import TileSelectScene from "../game-scenes/TileSelectScene.js";
import {Emerald} from "../graphics/Emerald.js";

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

        this.stones = [];

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
            // console.log('Event: MOUSE1_CLICKED - ', evt);

            const ctx = this.boardScene.ctx;
            const tiles = this.boardScene.tileMap.tiles;
            let x = (evt.pageX - this.boardScene.canvas.offsetLeft) * this.boardScene.canvas.height / this.boardScene.canvasRectLen;
            let y = (evt.pageY - this.boardScene.canvas.offsetTop) * this.boardScene.canvas.height / this.boardScene.canvasRectLen;
            for (let i = 0; i < this.boardScene.tileMap.rows; i++) {
                for (let j = 0; j < this.boardScene.tileMap.columns; j++) {
                    if ((tiles[i][j] instanceof TileWithWays) &&
                        (!tiles[i][j].settled) &&
                        (TILE_SIZE.x * TILE_SIZE.x >
                            (tiles[i][j].x - x) * (tiles[i][j].x - x) + (tiles[i][j].y - y) * (tiles[i][j].y - y))) {

                        // console.log(i, j);
                        // console.log(this.boardScene.tileMap.tiles[i][j]);
                        if (this.tileScene.selectedTile) {
                            this.tileScene.selectedTile.setType(null);
                            this.tileScene.selectedTile.setRotation(0);
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
        // console.log("Players", data.players);
        this.players = data.players.map(player => new Player(player.id, player.nickname, player.avatar));
        Component.render(this.players.map(player => player.component), this.playersRoot);

        console.log(this.players);

        this.userId = data.userId;
        this.boardScene.init(data);
        console.log("TILEE:", this.boardScene.tileMap);
        data.stones.forEach(stone => {
           this.boardScene.scene.push(new Emerald(this.boardScene.ctx, stone.gate, this.boardScene.tileMap.tiles[stone.row][stone.col], stone.type));
        });
        this.boardScene.addStones();

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
        this.tileScene.selectedTile = null;

        if (evt.currentTry.playerId) {
            this.players.forEach(
                player => evt.currentTry.playerId === player.id ? player.activate() : player.deactivate()
            );
            if (evt.lastTry.row) {
                // debugger;
                const data = evt.lastTry;
                this.boardScene.tileMap.tiles[data.row][data.col].setType(data.type);
                this.boardScene.tileMap.tiles[data.row][data.col].setRotation(data.rotation);
                this.boardScene.tileMap.tiles[data.row][data.col].settled = true;

            }

            this.tileScene.tile.setType(evt.currentTry.tileType);
            this.tileScene.renderScene();
            if (evt.stones[1]) {
                this.stones.forEach(stone => {
                    // установить камни
                });
            }
        } else {
            this.players.forEach(player => player.deactivate());
        }
        bus.emit(EVENTS.GAME_STATE_CHANGED, this.state);
    }

    onWrongTry(ent) {
        alert('Не стоит закрывать выходы!' +
            'Поверните ячейку или разместите в другом месте.');
    }
}

export default GameCoreImpl;