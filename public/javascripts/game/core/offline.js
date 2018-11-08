import {GameCore} from "./gameCore.js";
import {EVENTS} from "./events.js";
import bus from "../../bus.js";
import {TILE_SIZE} from "../tileSpec.js";
import {GameServise} from "../GameService.js";

const events = EVENTS;

// const rand = require('rand');

class OfflineGame extends GameCore {
    constructor(controller, scene) {
        super(controller, scene);
        this.service = new GameServise();
        this.playersQueue = null;
        this.tilesStack = null;

        this.state = {};
        // this.gameloop = this.gameloop.bind(this);
        // this.gameloopRequestId = null;
        // this.lastFrame = 0;
    }

    start() {
        super.start();
        console.log('Emited: START_GAME');
        // TODO: get state data
        // Запрос в GameService за состоянием игры
        let state = {
            playersQueue: [],
            tilesStack: [],
        };
        setTimeout(function () {
            bus.emit(events.START_GAME, this.state);
        }.bind(this));
    }

    onMouseClicked(evt) {
        console.log('Event: MOUSE_CLICKED - ', evt);
        bus.emit(events.GAME_STATE_CHANGED, this.state);

        const ctx = this.scene.ctx;
        let x = (evt.pageX - this.scene.canvas.offsetLeft) * this.scene.canvas.height / this.scene.canvasRectLen;
        let y = (evt.pageY - this.scene.canvas.offsetTop) * this.scene.canvas.height / this.scene.canvasRectLen;


        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.lineWidth = 5;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        let text = (y / (TILE_SIZE.y * 2) ^ 0).toString() + " " + (x / (TILE_SIZE.x * 2) ^ 0).toString(); // TODO: ОООЧЕНЬ ПЛОХО БЕРИ КОНСТАНТЫ
        ctx.fillText(text, x + 10, y);

        ctx.closePath();

    }


    // onControllsPressed(evt) {
    //
    // }

    onGameStarted(evt) {
        console.log('Event: GAME_STARTED -', evt);
        this.controller.start();
        this.scene.init(evt);
        this.scene.start();
        const state = this.service.getGameStartState();
        this.scene.tileMap.setGates(state.players);
        bus.emit(events.GAME_STATE_CHANGED, this.state);
        // this.lastFrame = performance.now();
        // this.gameloopRequestId = requestAnimationFrame(this.gameloop);
    }

    onGameFinished(evt) {
        cancelAnimationFrame(this.gameloopRequestId);

        bus.emit('Event: CLOSE_GAME');
    }

    onGameStateChanged(evt) {
        console.log('StateChanged');
        this.scene.setState(evt);
        this.scene.renderScene();
    }
};

export {OfflineGame};