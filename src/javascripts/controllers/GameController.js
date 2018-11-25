import Controller from './Controller.js';
import GameView from "../components/GameView/GameView.js";
import Game from "../game/client/Game.js";
import OnlineGameService from "../game/online/OnlineGameService.js";
import OfflineGameService from "../game/offline/OfflineGameService.js";
import EVENTS from "../events.js";
import bus from "../bus.js"

const LEN_X = 60;
const LEN_Y = Math.sin(Math.PI / 3) * LEN_X;

export default class GameController extends Controller {
    constructor() {
        super(GameView);

        this._onClick = this._handleEvent.bind(this, 'click');
    }

    handle(args = []) {
        const gameCore = new Game(this._view);

        switch (args[0]) {
            case 'offline': {
                this.servise = new OfflineGameService();
                break;
            }
            case 'online': {
                this.servise = new OnlineGameService();
                break;
            }
            default:
                // TODO: handle differently
                throw new Error('PAGE NOT FOUND');
        }

        this.start();
        gameCore.start();
    }

    start() {
        console.log("GameControllers: Start");
        this._view.boardCanvas.addEventListener('click', this._onClick);
    }

    stop() {
        this._view.boardCanvas.removeEventListener('click', this._onClick);
    }

    _handleEvent(type, event) {
        console.log(type, event);
        if (type === 'click') {
            bus.emit(EVENTS.MOUSE_CLICKED, {
                ...event,
                x: event.pageX - event.target.offsetLeft,
                y: event.pageY - event.target.offsetTop,
            });
        }
    }
}