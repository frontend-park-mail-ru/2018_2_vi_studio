import bus from '../bus.js';

const EVENTS = [
    'QueuePosition',
    'GameStart',
    'NextTry',
    'WrongTry',
];

export default class GameServise {
    constructor() {
        this.onReadyToPlay = this.onReadyToPlay.bind(this);
        this.onDoneTry = this.onDoneTry.bind(this);

        bus.on('game-event-ReadyToPlay', this.onReadyToPlay);
        bus.on('game-event-DoneTry', this.onDoneTry);
    }

    onMessage(message) {
        if (EVENTS.includes(message.event)) {
            bus.emit('game-event-' + message.event, message.data);
        } else {
            console.debug('Wrong Event', message.event);
        }
    }

    onReadyToPlay(data) {
        throw new Error('This method must be overridden');
    }

    onDoneTry(data) {
        throw new Error('This method must be overridden');
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
    players: [
        {   id int // local (game) id
            username string
            avatar string // image url
        }
    ]
}

// game-event-NextTry
event: NextTry
data: {
    lastTry: {
        row int
        col int
        rotation int
    }
    currentTry: {
        playerId int
        tileType int
    }
    gameOver: {
        players: [
            id int
            points int
        ]
    }
}

// game-event-WrongTry
event: WrongTry
data: {}

------------------------------------------ REQUESTS ------------------------------------------

// game-event-ReadyToPlay
event: ReadyToPlay
data: {}

// game-event-DoneTry
event: DoneTry
data: {
    row int
    col int
    rotation int
}

 */