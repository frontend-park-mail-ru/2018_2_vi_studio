import {EVENTS} from "./events";
import {bus} from "./../../bus";

const events = EVENTS;
const Bus = bus;

class GameCore {
    constructor(controller, scene) {
        this.controller = controller;
        this.scene = scene;

        this.onGameStarted = this.onGameStarted.bind(this);
        this.onGameFinished = this.onGameFinished.bind(this);
        // this.onMousePressed = this.onMousePressed.bind(this);
        this.onGameStateChanged = this.onGameStateChanged.bind(this);

        this.controllersLoopIntervalId = null;
    }

    start() {
        bus.on(events.START_GAME, this.onGameStarted);
        bus.on(events.FINISH_GAME, this.onGameFinished);
        // bus.on(events.MOUSE_PRESSED, this.onMousePressed);
        bus.on(events.GAME_STATE_CHANGED, this.onGameStateChanged);

        const controller = this.controller;
        this.controllersLoopIntervalId = setInterval(function () {
            const actions = controller.diff();

            if (Object.keys(actions).some(k => actions[k])) {
                bus.emit(events.MOUSE_PRESSED, actions);
            }
        }, 50);
    }

    destroy() {
        clearInterval(this.controllersLoopIntervalId);
        bus.off(events.START_GAME, this.onGameStarted);
        bus.off(events.FINISH_GAME, this.onGameFinished);
        // bus.off(events.MOUSE_PRESSED, this.onMousePressed);
        bus.off(events.GAME_STATE_CHANGED, this.onGameStateChanged);

        this.controller.destroy();
        this.scene.stop();
    }

    // onMousePressed(evt) {
    //     throw new Error('This method must be overridden');
    // }

    onGameStarted(evt) {
        throw new Error('This method must be overridden');
    }

    onGameFinished(evt) {
        throw new Error('This method must be overridden');
    }

    onGameStateChanged(evt) {
        throw new Error('This method must be overridden');
    }

    _pressed(name, data) {
        return KEYS[name].some(k => data[k.toLowerCase()]);
    }
};

export {GameCore}