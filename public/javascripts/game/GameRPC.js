import bus from '../bus.js';

export default class GameRPC {
    constructor() {
        this.onReadyToPlay = this.onReadyToPlay.bind(this);
        this.onDoneTry = this.onDoneTry.bind(this);
        this.onWSMessage = this.onWSMessage.bind(this);
        this.onWSClose = this.onWSClose.bind(this);

        this.ws = new WebSocket(window.SERVER_WS_PATH);

        this.ws.addEventListener('open', () => bus.emit('game-rpc-ws-open'));
        this.ws.addEventListener('message', this.onWSMessage);
        this.ws.addEventListener('error', error => bus.emit('game-rpc-ws-error', error));
        this.ws.addEventListener('close', this.onWSClose);

        bus.on('game-event-ReadyToPlay', this.onReadyToPlay);
        bus.on('game-event-DoneTry', this.onDoneTry);
    }

    onWSMessage(event) {
        const message = JSON.parse(event.data);
        bus.emit('game-event-' + message.event, message.data);
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

    destroy() {
        bus.off('game-event-ReadyToPlay', this.onReadyToPlay);
        bus.off('game-event-DoneTry', this.onDoneTry);
    }
}

/*
------------------------------------------ RESPONSES ------------------------------------------

// game-event-QueuePosition
event: QueuePosition
data: {
    position int
}

// game-event-GameStart
event: GameStart
data: {
    Players: [
        {   id int // local (game) id
            username string
            avatar string // image url
        }
    ]
}

// game-event-StartTry
event: StartTry
data: {
    playerId int
    tile: {
        type int
    }
}

// game-event-TimeOut
event: TimeOut
data: {
}

// game-event-GameOver
event: GameOver
data: {
    players {
        id int
        points int
    }
}

------------------------------------------ REQUESTS ------------------------------------------

// game-event-ReadyToPlay
event: ReadyToPlay
data: {
}

// game-event-DoneTry
event: DoneTry
data: {
    row int
    col int
    rotation int
}
 */