const noop = () => {};

export default class OfflineGame{
    constructor() {
        // this.emitQueuePosition = noop();
        this.emitGameStart = noop();
        this.emitNextTry = noop();
        this.emitWrongTry = noop();
    }

    readyToPlay(data) {
        this.emitGameStart({});
        this.emitNextTry();
    }

    doneTry(data) {
        if (true) {
            this.emitWrongTry();
            return
        }

        this.emitNextTry();
    }
}