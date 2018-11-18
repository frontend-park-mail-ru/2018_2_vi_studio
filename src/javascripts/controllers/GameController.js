import Controller from './Controller.js';
import GameView from "../components/GameView/GameView.js";
import GameControllers from "../game/client/GameControllers.js";
import GameCoreImpl from "../game/client/core/GameCoreImpl.js";
import GameScene from "../game/client/game-scenes/GameScene.js";
import OnlineGameService from "../game/online/OnlineGameService.js";
import OfflineGameServise from "../game/offline/OfflineGameServise.js";

const LEN_X = 60;
const LEN_Y = Math.sin(Math.PI / 3) * LEN_X;

export default class GameController extends Controller {
    constructor() {
        super(GameView);
    }

    handle(args = []) {
        const gameScene = new GameScene(this._view.areaCanvas);
        const gameControllers = new GameControllers(this._view.areaCanvas);
        const gameCore = new GameCoreImpl(gameControllers, this._view);

        switch (args[0]) {
            case 'offline': {
                this.servise = new OnlineGameService();
                break;
            }
            case 'online': {
                this.servise = new OfflineGameServise(gameCore.scene.tileMap);
                break;
            }
            default:
                // TODO: handle differently
                throw new Error('PAGE NOT FOUND');
        }

        gameCore.start();

    }
}