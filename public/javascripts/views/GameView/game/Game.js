import MODES from "./modes.js";
import {GameControllers} from "./controllers.js"

// const GameControllers = GameControllers;
// const OfflineGame = require('game/core/offline');
// const OnlineGame = require('game/core/online');
// const GameScene = require('game/game-scene');
// const GameControllers = require('game/controllers');

class Game {
    constructor(mode, canvas) {
        let GameConstructor = null;
        switch (mode) {
            // case GAME_MODES.ONLINE: {
            //     GameConstructor = OnlineGame;
            //     break;
            // }
            case MODES.OFFLINE: {
                GameConstructor = OfflineGame;
                break;
            }
            default:
                throw new Error('Invalid game mode ' + mode);
        }

        this.gameScene = new GameScene(canvas);
        this.gameControllers = new GameControllers(canvas);

        this.gameCore = new GameConstructor(this.gameControllers, this.gameScene);
        this.start();
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