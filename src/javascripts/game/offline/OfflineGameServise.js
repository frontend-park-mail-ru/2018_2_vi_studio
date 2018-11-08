import GameServise from "../GameServise.js";
import OfflineGame from "./OfflineGame";

export default class OfflineGameServise extends GameServise {
    constructor() {
        super();

        const game = new OfflineGame();
        game.onQueuePosition = data => this.onMessage('QueuePosition', data);
        game.onGameStart = data => this.onMessage('GameStart', data);
        game.onNextTry = data => this.onMessage('NextTry', data);
        game.onWrongTry = data => this.onMessage('WrongTry', data);
        this.game = game;
    }

    onReadyToPlay(data) {
        this.game.readyToPlay(data);
    }

    onDoneTry(data) {
        this.game.doneTry(data);
    }
}