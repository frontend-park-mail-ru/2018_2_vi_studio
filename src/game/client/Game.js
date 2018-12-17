import GameCore from "./GameCore.js";
import {EVENTS} from "../../constants.js";
import bus from "../../bus.js";
import Player from "./Player.js";
import TileWithWays from "./graphics/TileWithWays.js";
import GameScene from "./game-scenes/GameScene.js";
import Component from "../../components/Component.js";
import TileSelectScene from "./game-scenes/TileSelectScene.js";
import {COLORS} from "../config.js";

const PLAYERS_COLORS = ['blue', 'green'];

class Game extends GameCore {
    constructor(component, showProgress = false) {
        super();

        this.boardScene = new GameScene(component.boardCanvas);
        this.tileScene = new TileSelectScene(component.tileCanvas);
        this.playersRoot = component.playersRoot;

        this.submitButton = component.submitButton;
        this.submitButton.addEventListener('click', this.tileScene.submit);

        this.quitButton = component.quitButton;
        this.quitButton.addEventListener('click',
            () => bus.emit(EVENTS.ALERT, {
                message: 'Do you really want to quit the game?',
                actions: [{name: 'Yes', callback: () => bus.emit(EVENTS.GAME_OVER)}]
            })
        );

        this.userId = null;

        this.state = {};

        this.showProgress = showProgress;
    }

    start() {
        super.start();
        bus.emit(EVENTS.READY_TO_PLAY, {});
    }

    destroy() {
        super.destroy();
        this.boardScene.destroy();
        this.tileScene.destroy();

        this.submitButton.removeEventListener('click', this.tileScene.submit);
    }

    onMouseClicked(evt) {
        console.log(this.players[this.userId].isActive());
        if (this.players[this.userId].isActive()) {
            const x = evt.x * this.boardScene.width / this.boardScene.canvasSize;
            const y = evt.y * this.boardScene.height / this.boardScene.canvasSize;
            const tile = this.boardScene.tileMap.getTile(x, y);

            if (tile === this.tileScene.selectedTile) {
                this.tileScene.rotate();
                return
            }

            if (tile instanceof TileWithWays && !tile.settled) {
                // remove last selected tile
                if (this.tileScene.selectedTile) {
                    this.tileScene.selectedTile.setType(null);
                    this.tileScene.selectedTile.fillStyle = COLORS.BACKGROUND;
                }

                // set new selected tile
                this.tileScene.selectedTile = tile;
                this.tileScene.selectedTile.setType(this.tileScene.tile.getType(), this.tileScene.tile.rotationCount);
                this.tileScene.selectedTile.fillStyle = COLORS.SELECTED_TILE;

                console.log(this.state);
                bus.emit(EVENTS.GAME_STATE_CHANGED, this.state);
            }
        }
    }

    onGameStarted(data) {
        this.players = data.players.map((player, i) => new Player(player.id, player.nickname, player.avatar, PLAYERS_COLORS[i]));
        Component.render(this.players.map(player => player.component), this.playersRoot);

        this.userId = data.userId;

        this.boardScene.init(this.players);
        this.boardScene.tileMap.setGates(this.players);
    }

    onGameOver() {
        this.destroy();
    }

    onGameStateChanged() {
        console.log('STATE CHANGED');
        this.boardScene.render();
    }

    onNextTry(evt) {
        console.log('onNext', evt);

        // remove last selected tile
        if (this.tileScene.selectedTile) {
            this.tileScene.selectedTile.setType(null);
            this.tileScene.selectedTile.fillStyle = COLORS.BACKGROUND;
            this.tileScene.selectedTile = null;
        }

        // set last try tile
        if (evt.lastTry.row) {
            const data = evt.lastTry;
            this.boardScene.tileMap.tiles[data.row][data.col].setType(this.tileScene.tile.getType(), data.rotationCount);
            this.boardScene.tileMap.tiles[data.row][data.col].settled = true;
        }

        this.tileScene.tile.setType(evt.currentTry.tileType);

        this.players.forEach(player => evt.currentTry.playerId === player.id ? player.activate(this.showProgress) : player.deactivate());

        this.boardScene.tileMap.moveStones();

        this.tileScene.render();
        if (evt.gameOver.players) {
            this.players.forEach(player => player.deactivate());
            const msg = this.players.map(player => `${player.nickname}: ${player.points}`);
            bus.emit(EVENTS.ALERT, {message: msg});
            bus.emit(EVENTS.GAME_OVER);
        }

        bus.emit(EVENTS.GAME_STATE_CHANGED, this.state);
    }

    onWrongTry(ent) {
        bus.emit(EVENTS.ALERT, {
            message: 'Не стоит закрывать выходы! Поверните ячейку или разместите в другом месте.'
        });
    }
}

export default Game;