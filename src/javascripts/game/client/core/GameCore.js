import EVENTS from "../../../events.js";
import bus from "../../../bus.js";


class GameCore {
    constructor() {
        this.onGameStarted = this.onGameStarted.bind(this);
        this.onGameFinished = this.onGameFinished.bind(this);
        this.onMouseClicked = this.onMouseClicked.bind(this);
        this.onGameStateChanged = this.onGameStateChanged.bind(this);
        this.onNextTry = this.onNextTry.bind(this);

        this.controllersLoopIntervalId = null;
    }


    // TODO: rewrite EVENTS
    start() {
        bus.on(EVENTS.GAME_START, this.onGameStarted);
        bus.on(EVENTS.FINISH_GAME, this.onGameFinished);
        bus.on(EVENTS.MOUSE_CLICKED, this.onMouseClicked);
        bus.on(EVENTS.GAME_STATE_CHANGED, this.onGameStateChanged);
        bus.on(EVENTS.NEXT_TRY, this.onNextTry);
        // this.controller.start();
    }

    destroy() {
        clearInterval(this.controllersLoopIntervalId);

        bus.off(EVENTS.GAME_START, this.onGameStarted);
        bus.off(EVENTS.FINISH_GAME, this.onGameFinished);
        bus.off(EVENTS.MOUSE_CLICKED, this.onMouseClicked);
        bus.off(EVENTS.GAME_STATE_CHANGED, this.onGameStateChanged);
        bus.off(EVENTS.NEXT_TRY, this.onNextTry);
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