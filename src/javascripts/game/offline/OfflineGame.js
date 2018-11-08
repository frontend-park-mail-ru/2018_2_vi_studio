const noop = () => {};

export default class OfflineGame{
    constructor() {
        this.onQueuePosition = noop();
        this.onGameStart = noop();
        this.onNextTry = noop();
        this.onWrongTry = noop();
    }

    readyToPlay(data) {
    }

    doneTry(data) {
    }
}