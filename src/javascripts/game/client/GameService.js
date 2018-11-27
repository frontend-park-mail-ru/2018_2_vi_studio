import bus from '../../bus.js';
import EVENTS from '../../events.js';


export default class GameService {
    constructor() {
        this.onReadyToPlay = this.onReadyToPlay.bind(this);
        this.onDoneTry = this.onDoneTry.bind(this);

        bus.on(EVENTS.READY_TO_PLAY, this.onReadyToPlay);
        bus.on(EVENTS.DONE_TRY, this.onDoneTry);
    }

    onMessage(message) {
        if (Object.values(EVENTS).includes(message.event)) {
            console.log(message.event);
            bus.emit(message.event, message.data);
        } else {
            console.log('Wrong Event', message.event);
        }
    }

    onReadyToPlay(data) {
        throw new Error('This method must be overridden');
    }

    onDoneTry(data) {
        throw new Error('This method must be overridden');
    }

    destroy() {
        bus.off(EVENTS.READY_TO_PLAY, this.onReadyToPlay);
        bus.off(EVENTS.DONE_TRY, this.onDoneTry);
    }
}

/*
------------------------------------------ RESPONSES ------------------------------------------
event: QUEUE_POSITION
data: {
    position int
}

event: GAME_START
data: {
    players: [
        {   id int // local (game) id
            username string
            avatar string // image url
        }
    ]
}

event: NEXT_TRY
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

event: WRONG_TRY
data: {}

------------------------------------------ REQUESTS ------------------------------------------
event: READY_TO_PLAY
data: {}

event: DONE_TRY
data: {
    row int
    col int
    rotation int
}
 */