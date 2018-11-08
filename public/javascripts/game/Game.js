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
        let GameServiseConstructor = null;
        console.log("Game mode: ", mode);
        switch (mode) {
            case GAME_MODES.ONLINE: {
                GameServiseConstructor = OnlineRPC;
                break;
            }
            case GAME_MODES.OFFLINE: {
                GameServiseConstructor = OfflineRPC;
                break;
            }
            default:
                throw new Error('Invalid game mode ' + mode);
        }
        this.servise = new GameServiseConstructor();
        this.gameScene = new GameScene(canvas);
        this.gameControllers = new GameControllers(canvas);
        this.gameCore = new OfflineGame(this.gameControllers, this.gameScene);
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