import MODES from "./modes.js";
import {GameControllers} from "./controllers.js";
import {OfflineGame} from "./core/offline.js";
import {GameScene} from "./game-scenes/mainScene.js";
import {GameServise} from "./GameService.js";

const GAME_MODES = MODES;


class Game {
    constructor(mode, canvas) {
        let GameConstructor = null;
        console.log("Game mode: ", mode);
        switch (mode) {
            case GAME_MODES.ONLINE: {
                GameConstructor = OfflineGame;
                break;
            }
            case GAME_MODES.OFFLINE: {
                GameConstructor = OfflineGame;
                break;
            }
            default:
                throw new Error('Invalid game mode ' + mode);
        }

        this.gameScene = new GameScene(canvas);
        this.gameControllers = new GameControllers(canvas);
        this.gameService = new GameServise(mode);
        this.gameCore = new GameConstructor(this.gameControllers, this.gameScene);
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