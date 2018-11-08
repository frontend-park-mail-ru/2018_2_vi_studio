import bus from '../bus.js';
import GameRPC from "./GameRPC.js";

export default class GameRPCOnline extends GameRPC{
    constructor() {
        super();
        this.onWSClose = this.onWSClose.bind(this);

        this.ws = new WebSocket(window.SERVER_WS_PATH);

        this.ws.addEventListener('open', () => bus.emit('game-rpc-ws-open'));
        this.ws.addEventListener('message', this.onMessage);
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