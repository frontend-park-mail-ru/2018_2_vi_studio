export const SERVER_WS_PATH = `wss://${process.env.SERVER_HOST}/game-ws`;
export const SERVER_API_PATH = `https://${process.env.SERVER_HOST}/api`;
// export const IMAGES_PATH = `http://${process.env.SERVER_HOST}/media/images/`;
export const IMAGES_PATH = `https://hb.bizmrg.com/vi-studio/`;
//https://hb.bizmrg.com/vi-studio/2a2ef2d0-3dc7-42fb-9601-418201e09f06
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
    SUBMIT: 'SUBMIT',
    ALERT: 'ALERT',
};

export const NO_AVATAR_PATH = '/public/images/no-avatar.jpg';
export const BOT_AVATAR_PATH = 'bot-avatar.png';

export const USER_NAV_ITEMS = [
    {title: 'Single player', href: '/game/offline'},
    {title: 'Multi player', href: '/game/online'},
    {title: 'Home', href: '/'},
    {title: 'Profile', href: '/profile'},
    {title: 'Leaders', href: '/leaders'},
    {title: 'Rules', href: '/rules'},
    {title: 'Sign out', href: '/sign_out'}
];

export const GUEST_NAV_ITEMS = [
    {title: 'Home', href: '/'},
    {title: 'Single player', href: '/game/offline'},
    {title: 'Sign in', href: '/sign_in'},
    {title: 'Sign up', href: '/sign_up'},
    {title: 'Leaders', href: '/leaders'},
    {title: 'Rules', href: '/rules'},
];