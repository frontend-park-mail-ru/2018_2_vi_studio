import GameServise from "../GameService.js";
import OfflineGame from "./OfflineGame.js";

export default class OfflineGameServise extends GameServise {
    constructor() {
        super();

        const game = new OfflineGame();
        game.emitGameStart = data => this.onMessage({data: data, event: 'GameStart'});
        game.emitNextTry = data => this.onMessage({data: data, event: 'NextTry'});
        game.emitWrongTry = data => this.onMessage({data: data, event: 'WrongTry'});
        this.game = game;
    }

    onReadyToPlay(data) {
        this.game.readyToPlay(data);
    }

    onDoneTry(data) {
        this.game.doneTry(data);
    }
}
