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
    constructor(router) {
        super(GameView);

        this.router = router;

        this._onClick = this._handleEvent.bind(this, 'click');
        this.stop = this.stop.bind(this);
    }

    handle(args = []) {
        bus.on(EVENTS.SERVICE_START, () => {
            this.start();
        });

        switch (args[0]) {
            case 'offline': {
                this.gameCore = new Game(this._view);
                this.servise = new OfflineGameService();
                break;
            }
            case 'online': {
                this.gameCore = new Game(this._view, true);
                this.servise = new OnlineGameService();
                break;
            }
            default:
                // TODO: handle differently
                throw new Error('PAGE NOT FOUND');
        }
    }

    start() {
        bus.off(EVENTS.SERVICE_START, this.start);
        bus.on(EVENTS.GAME_OVER, this.stop);

        console.log("GameControllers: Start");
        this._view.boardCanvas.addEventListener('click', this._onClick);
        this.gameCore.start();
    }

    stop() {
        bus.off(EVENTS.GAME_OVER, this.stop);

        this._view.boardCanvas.removeEventListener('click', this._onClick);
        this.router.open('/');
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