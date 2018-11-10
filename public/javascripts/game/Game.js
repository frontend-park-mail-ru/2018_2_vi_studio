import MODES from "./modes.js";
import {GameControllers} from "./controllers.js";
import {OfflineGame} from "./core/offline.js";
import {GameScene} from "./game-scenes/mainScene.js";
import {GameServise} from "./GameService.js";
import OnlineRPC from "../game/GameRPCOnline.js";
import OfflineRPC from "../game/GameRPCOffline.js";

const GAME_MODES = MODES;


class Game {
    constructor(mode, canvas) {
        this.gameScene = new GameScene(canvas);
        this.gameControllers = new GameControllers(canvas);
        this.gameCore = new OfflineGame(this.gameControllers, this.gameScene);
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
        //this.start();
    }

    start() {
        this.gameCore.start();
    }

    destroy() {
        this.gameCore.destroy();
    }
}

export default Game;
// export const Game = new Game();