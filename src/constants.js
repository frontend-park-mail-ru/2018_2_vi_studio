export const SERVER_WS_PATH = `ws://${process.env.SERVER_IP}:8001`;
export const SERVER_PATH = `http://${process.env.SERVER_IP}:8000`;

export const EVENTS = {
    QUEUE_POSITION: 'QUEUE_POSITION',
    GAME_START: 'GAME_START',
    GAME_OVER: 'GAME_OVER',
    MOUSE_CLICKED: 'MOUSE_CLICKED',
    GAME_STATE_CHANGED: 'GAME_STATE_CHANGED',
    NEXT_TRY: 'NEXT_TRY',
    WRONG_TRY: 'WRONG_TRY',
    READY_TO_PLAY: 'READY_TO_PLAY',
    DONE_TRY: 'DONE_TRY',
    SERVICE_START: 'SERVICE_START',
    SUBMIT: 'SUBMIT'
};

export const IMAGES_PATH = SERVER_PATH + '/media/images/';
export const NO_AVATAR_PATH = '/build/images/no-avatar.jpg';
export const BOT_AVATAR_PATH = '/build/images/bot-avatar.png';