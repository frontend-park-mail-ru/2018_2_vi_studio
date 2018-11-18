import {EVENTS} from "./events.js";
import bus from "../../../bus.js";

const events = EVENTS;
const Bus = bus;

class GameCore {
    constructor(controller, scene) {
        this.controller = controller;
        this.scene = scene;

        this.onGameStarted = this.onGameStarted.bind(this);
        this.onGameFinished = this.onGameFinished.bind(this);
        this.onMouseClicked = this.onMouseClicked.bind(this);
        this.onGameStateChanged = this.onGameStateChanged.bind(this);
        this.onNextTry = this.onNextTry.bind(this);

        this.controllersLoopIntervalId = null;
    }

    start() {
        bus.on(events.GAME_START, this.onGameStarted);
        bus.on(events.FINISH_GAME, this.onGameFinished);
        bus.on(events.MOUSE_CLICKED, this.onMouseClicked);
        bus.on(events.GAME_STATE_CHANGED, this.onGameStateChanged);
        bus.on(events.NEXT_TRY, this.onNextTry);
        // this.controller.start();
    }

    destroy() {
        clearInterval(this.controllersLoopIntervalId);
        bus.off(events.GAME_START, this.onGameStarted);
        bus.off(events.FINISH_GAME, this.onGameFinished);
        bus.off(events.MOUSE_CLICKED, this.onMouseClicked);
        bus.off(events.GAME_STATE_CHANGED, this.onGameStateChanged);
        bus.off(events.NEXT_TRY, this.onNextTry);

        this.controller.destroy();
        this.scene.stop();
    }

    onNextTry(evt) {
        throw new Error('This method must be overridden');
    }
    onMouseClicked(evt) {
        throw new Error('This method must be overridden');
    }

    onGameStarted(evt) {
        throw new Error('This method must be overridden');
    }

    onGameFinished(evt) {
        throw new Error('This method must be overridden');
    }

    onGameStateChanged(evt) {
        throw new Error('This method must be overridden');
    }

    // _pressed(name, data) {
    //     return KEYS[name].some(k => data[k.toLowerCase()]);
    // }
}

export {GameCore};