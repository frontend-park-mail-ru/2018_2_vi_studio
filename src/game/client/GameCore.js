import {EVENTS} from "../../constants.js";
import bus from "../../bus.js";

export default class GameCore {
    constructor() {
        this.onGameStarted = this.onGameStarted.bind(this);
        this.onGameFinished = this.onGameFinished.bind(this);
        this.onMouseClicked = this.onMouseClicked.bind(this);
        this.onGameStateChanged = this.onGameStateChanged.bind(this);
        this.onWrongTry = this.onWrongTry.bind(this);
        this.onNextTry = this.onNextTry.bind(this);

        this.controllersLoopIntervalId = null;
    }


    start() {
        bus.on(EVENTS.GAME_START, this.onGameStarted);
        bus.on(EVENTS.GAME_OVER, this.onGameFinished);
        bus.on(EVENTS.MOUSE_CLICKED, this.onMouseClicked);
        bus.on(EVENTS.GAME_STATE_CHANGED, this.onGameStateChanged);
        bus.on(EVENTS.NEXT_TRY, this.onNextTry);
        bus.on(EVENTS.WRONG_TRY, this.onWrongTry);
    }

    destroy() {
        clearInterval(this.controllersLoopIntervalId);

        bus.off(EVENTS.GAME_START, this.onGameStarted);
        bus.off(EVENTS.GAME_OVER, this.onGameFinished);
        bus.off(EVENTS.MOUSE_CLICKED, this.onMouseClicked);
        bus.off(EVENTS.GAME_STATE_CHANGED, this.onGameStateChanged);
        bus.off(EVENTS.NEXT_TRY, this.onNextTry);
        bus.off(EVENTS.WRONG_TRY, this.onWrongTry);
    }

    onNextTry(evt) {
        throw new Error('This method must be overridden');
    }
    onWrongTry(evt) {
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