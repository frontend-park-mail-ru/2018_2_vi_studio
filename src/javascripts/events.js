const prefix = 'game-event-';

const EVENTS = {
    GAME_START: prefix + 'GameStart',
    FINISH_GAME: 'FINISH_GAME',
    MOUSE_CLICKED: 'MOUSE_CLICKED',
    GAME_STATE_CHANGED: 'GAME_STATE_CHANGED',
    NEXT_TRY: prefix + 'NextTry',
    WRONG_TRY: prefix + 'WrongTry',
};

export default EVENTS;