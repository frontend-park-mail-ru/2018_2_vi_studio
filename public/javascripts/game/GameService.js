import MODES from "./modes.js";
import {TILES} from "./tileSpec.js";
import GameRPC from "./GameRPC.js";
import bus from "../bus.js";
// const Bus = bus;

class GameServise {
    constructor(gameType, playerId) {
        this.playerId = playerId;
        this.gameType = gameType;
        this.playersQueue = [];
        this.tilesStack = [];
        if (gameType === MODES.ONLINE) {

            this.servise = new GameRPC();
        }
    }

    getGameStartState() {
        if (this.gameType === MODES.OFFLINE) {
            this.playersQueue = [this.playerId, this.playerId + 1];

            for (let i = 0; i < TILES.length; i++) {
                for (let j = 0; j < TILES[i]; j++) {
                    this.tilesStack.push(i);
                }
            }

        } else {
            bus.emit('game-event-ReadyToPlay', {});
            //    запросик
        }
        return {
            players: this.playersQueue,
            tilesStack: this.tilesStack,
        };
    }


}

export {GameServise};