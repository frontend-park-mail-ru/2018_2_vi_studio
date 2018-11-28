import GameCore from "./GameCore.js";
import EVENTS from "../../events.js";
import bus from "../../bus.js";
import {TILE_SIZE} from "../config.js";
import Player from "./Player.js";
import {TileWithWays} from "./graphics/TileWithWays.js";
import GameScene from "./game-scenes/GameScene.js";
import Component from "../../components/Component.js";
import TileSelectScene from "./game-scenes/TileSelectScene.js";
import {COLORS} from "../config.js";
import OfflineTileMap from "../offline/gameObjects/TileMap.js";

class Game extends GameCore {
    constructor(component, showProgress = false) {
        super();

        this.boardScene = new GameScene(component.boardCanvas);
        this.tileScene = new TileSelectScene(component.tileCanvas);
        this.playersRoot = component.playersRoot;

        this.rotateButton = component.rotateButton;
        this.rotateButton.addEventListener('click', this.tileScene.rotate);

        this.submitButton = component.submitButton;
        this.submitButton.addEventListener('click', this.tileScene.submit);

        this.userId = null;

        this.state = {};
        this.showProgress = showProgress;

        this.tileMap = new OfflineTileMap();
        // this.stones = tileMap.stones;
    }

    start() {
        super.start();
        bus.emit(EVENTS.READY_TO_PLAY, {});
    }

    onMouseClicked(evt) {
        console.log(this.players[this.userId].isActive());
        if (this.players[this.userId].isActive()) {
            const x = evt.x * this.boardScene.canvas.width / this.boardScene.canvasRectLen;
            const y = evt.y * this.boardScene.canvas.height / this.boardScene.canvasRectLen;
            const tile = this.boardScene.tileMap.getTile(x, y);

            if ((tile instanceof TileWithWays) &&
                (!tile.settled) &&
                (TILE_SIZE.x * TILE_SIZE.x >
                    (tile.x - x) * (tile.x - x) + (tile.y - y) * (tile.y - y))) {

                // remove last selected tile
                if (this.tileScene.selectedTile) {
                    this.tileScene.selectedTile.setType(null);
                    this.tileScene.selectedTile.setRotation(0);
                    this.tileScene.selectedTile.fillStyle = COLORS.BACKGROUND;
                }

                // set new selected tile
                this.tileScene.selectedTile = tile;
                this.tileScene.selectedTile.fillStyle = COLORS.SELECTED_TILE;
                this.tileScene.selectedTile.setType(this.tileScene.tile.type);
                this.tileScene.selectedTile.setRotation(this.tileScene.tile.rotationCount);

                bus.emit(EVENTS.GAME_STATE_CHANGED, this.state);
            }
        }
    }

    onGameStarted(data) {
        this.players = data.players.map(player => new Player(player.id, player.nickname, player.avatar));
        Component.render(this.players.map(player => player.component), this.playersRoot);

        this.userId = data.userId;

        // TODO: rewrite
        data.stones = this.tileMap.stones;
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

        // remove last selected tile
        if (this.tileScene.selectedTile) {
            this.tileScene.selectedTile.setType(null);
            this.tileScene.selectedTile.setRotation(0);
            this.tileScene.selectedTile.fillStyle = COLORS.BACKGROUND;
            this.tileScene.selectedTile = null;
        }


        // TODO: rewrite

        if (evt.lastTry.row) {
            const data = evt.lastTry;

            this.boardScene.tileMap.tiles[data.row][data.col].setType(this.tileScene.tile.getType());
            this.boardScene.tileMap.tiles[data.row][data.col].setRotation(data.rotationCount);
            this.boardScene.tileMap.tiles[data.row][data.col].settled = true;
        }

        // evt.stones = this.stones;
        this.players.forEach(player => evt.currentTry.playerId === player.id ? player.activate(this.showProgress) : player.deactivate());


        this.tileScene.tile.setType(evt.currentTry.tileType);
        this.tileScene.renderScene();
        // console.log("DEFORE", evt.stones);
        for (let i = 0; i < this.boardScene.tileMap.stones.length; i++) {
            this.boardScene.tileMap.stones[i].setPos(this.boardScene.tileMap.tiles[evt.stones[i].row][evt.stones[i].col], evt.stones[i].gate);
            this.boardScene.tileMap.stones[i].isOutOfGame = evt.stones[i].isOutOfGame;
        }
        // console.log("AFTER", this.boardScene.tileMap.stones);
        if (evt.gameOver.players) {
            this.players.forEach(player => player.deactivate());
            let str = "Player: " + evt.gameOver.players[0].points + "\n Bot: " + evt.gameOver.players[1].points;
            alert(str);
            //destroy
            debugger;
            bus.emit(EVENTS.GAME_OVER);
            // TODO: points and new game!!!!
        }


        bus.emit(EVENTS.GAME_STATE_CHANGED, this.state);
    }

    onWrongTry(ent) {
        alert('Не стоит закрывать выходы!' +
            'Поверните ячейку или разместите в другом месте.');
    }

}

export default Game;