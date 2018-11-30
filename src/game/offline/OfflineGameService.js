import GameService from "../client/GameService.js";
import OfflineGame from "./OfflineGame.js";
import {EVENTS} from "../../constants.js";
import bus from "../../bus.js";

export default class OfflineGameService extends GameService {
    constructor() {
        super();

        this.game = new OfflineGame(this.onMessage.bind(this));
        bus.emit(EVENTS.SERVICE_START);
    }

    onReadyToPlay(data) {
        this.game.readyToPlay(data);
    }

    onDoneTry(data) {
        this.game.doneTry(data);
    }

    destroy() {
        super.destroy();
    }
}
