import MODES from "./modes.js";
import {GameControllers} from "./controllers.js";
import GameCoreImpl from "./core/GameCoreImpl.js";
import {GameScene} from "./game-scenes/mainScene.js";
import OnlineRPC from "./online/OnlineGameService.js";
import OfflineRPC from "./offline/OfflineGameServise.js.tmp";

const GAME_MODES = MODES;

class Game {
    constructor(mode, canvas) {
        this.gameScene = new GameScene(canvas);
        this.gameControllers = new GameControllers(canvas);
        this.gameCore = new GameCoreImpl(this.gameControllers, this.gameScene);
        switch (mode) {
            case GAME_MODES.ONLINE: {
                this.servise = new OnlineRPC();
                break;
            }
            case GAME_MODES.OFFLINE: {
                this.servise = new OfflineRPC(this.gameCore.scene.tileMap);
                break;
            }
            default:
                throw new Error('Invalid game mode ' + mode);
        }
    }

    start() {
        this.gameCore.start();
    }

    destroy() {
        this.gameCore.destroy();
    }
}

export default Game;
