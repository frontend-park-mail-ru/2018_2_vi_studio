import bus from '../../bus.js';
import GameServise from "../GameServise.js";

export default class OnlineGameService extends GameServise {
    constructor() {
        super();
        this.onWSClose = this.onWSClose.bind(this);

        this.ws = new WebSocket(window.SERVER_WS_PATH);

        this.ws.addEventListener('open', () => bus.emit('game-rpc-ws-open'));
        this.ws.addEventListener('message', event => this.onMessage(JSON.parse(event.data)));
        this.ws.addEventListener('error', error => bus.emit('game-rpc-ws-error', error));
        this.ws.addEventListener('close', this.onWSClose);
    }

    onReadyToPlay(data) {
        this.ws.send(JSON.stringify({event: 'ReadyToPlay', data: data}));
    }

    onDoneTry(data) {
        this.ws.send(JSON.stringify({event: 'DoneTry', data: data}));
    }

    onWSClose(event) {
        this.destroy();
        bus.emit('game-rpc-ws-close', event);
    }
}