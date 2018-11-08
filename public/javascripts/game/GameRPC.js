import bus from '../bus.js';

export default class GameRPC {
    constructor() {
        this.onReadyToPlay = this.onReadyToPlay.bind(this);
        this.onDoneTry = this.onDoneTry.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.onGameStart = this.onGameStart.bind(this);
        this.onNextTry = this.onGameStart.bind(this);

        bus.on('game-event-Message', this.onMessage);
        bus.on('game-event-ReadyToPlay', this.onReadyToPlay);
        bus.on('game-event-DoneTry', this.onDoneTry);
        bus.on('game-event-GameStart', this.onGameStart);
    }

    onGameStart(data) {
        throw new Error('This method must be overridden');
    }

    onMessage(event) {
        throw new Error('This method must be overridden');
    }

    onReadyToPlay(data) {
        throw new Error('This method must be overridden');
    }

    onDoneTry(data) {
        throw new Error('This method must be overridden');
    }



    destroy() {
        bus.off('game-event-Message', this.onMessage);
        bus.off('game-event-ReadyToPlay', this.onReadyToPlay);
        bus.off('game-event-DoneTry', this.onDoneTry);
        bus.off('game-event-GameStart', this.onGameStart);

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