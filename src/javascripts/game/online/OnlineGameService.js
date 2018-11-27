import bus from '../../bus.js';
import EVENTS from '../../events.js';
import GameRPC from '../client/GameService.js';
import {SERVER_WS_PATH} from '../../constants.js';

export default class OnlineGameService extends GameRPC{
    constructor() {
        super();
        this.onWSClose = this.onWSClose.bind(this);

        this.ws = new WebSocket(SERVER_WS_PATH);

        this.ws.addEventListener('open', () => bus.emit('game-rpc-ws-open'));
        this.ws.addEventListener('message', this.onMessage);
        this.ws.addEventListener('error', error => bus.emit('game-rpc-ws-error', error));
        this.ws.addEventListener('close', this.onWSClose);
    }

    onReadyToPlay(data) {
        this.ws.send(JSON.stringify({event: EVENTS.READY_TO_PLAY, data: data}));
    }

    onDoneTry(data) {
        this.ws.send(JSON.stringify({event: EVENTS.DONE_TRY, data: data}));
    }

    onWSClose(event) {
        this.destroy();
        bus.emit('game-rpc-ws-close', event);
    }
}