import GameService from "../client/GameService.js";
import OfflineGame from "./OfflineGame.js";

export default class OfflineGameService extends GameService {
    constructor() {
        super();

        this.game = new OfflineGame(this.onMessage.bind(this));
    }

    onReadyToPlay(data) {
        this.game.readyToPlay(data);
    }

    onDoneTry(data) {
        this.game.doneTry(data);
    }
}
