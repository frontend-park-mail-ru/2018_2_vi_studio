import GameServise from "../GameServise.js";
import OfflineGame from "./OfflineGame";

export default class OfflineGameServise extends GameServise {
    constructor() {
        super();

        const game = new OfflineGame();
        game.emitQueuePosition = data => this.onMessage('QueuePosition', data);
        game.emitGameStart = data => this.onMessage('GameStart', data);
        game.emitNextTry = data => this.onMessage('NextTry', data);
        game.emitWrongTry = data => this.onMessage('WrongTry', data);
        this.game = game;
    }

    onReadyToPlay(data) {
        this.game.readyToPlay(data);
    }

    onDoneTry(data) {
        this.game.doneTry(data);
    }
}