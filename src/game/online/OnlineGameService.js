import bus from '../../bus.js';
import {EVENTS} from "../../constants.js";
import GameService from '../client/GameService.js';
import {SERVER_WS_PATH} from '../../constants.js';

export default class OnlineGameService extends GameService{
    constructor() {
        super();
        this.onWSClose = this.onWSClose.bind(this);

        this.ws = new WebSocket(SERVER_WS_PATH);

        this.ws.addEventListener('open', () => bus.emit(EVENTS.SERVICE_START));
        // this.ws.addEventListener('open', () => bus.emit('game-rpc-ws-open'));
        this.ws.addEventListener('message', this.onMessage.bind(this));
        this.ws.addEventListener('error', error => bus.emit('game-rpc-ws-error', error));
        this.ws.addEventListener('close', this.onWSClose.bind(this));
    }

    onMessage(message) {
        super.onMessage(JSON.parse(message.data));
    }


    onReadyToPlay(data) {
        this.ws.send(JSON.stringify({event: EVENTS.READY_TO_PLAY, data: data}));
    }

    onDoneTry(data) {
        console.log({event: EVENTS.DONE_TRY, data: data});
        this.ws.send(JSON.stringify({event: EVENTS.DONE_TRY, data: data}));
    }

    onWSClose(event) {
        this.destroy();
    }

    destroy() {
        this.ws.close(200, 'game over');
        super.destroy();
    }
}