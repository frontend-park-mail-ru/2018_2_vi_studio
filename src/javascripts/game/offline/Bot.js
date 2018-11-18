export default class Bot {
    constructor(id) {
        this.id = id;
        this.username = 'Bot';
        this.avatar = '';
        this.active = false;
    }
    setGame(game) {
        this.game = game;
    }

    getNextTile() {
        console.log('Next tile');
    }

    getData() {
        return {
            id: this.id,
            username: this.username,
            avatar: this.avatar,
        };
    }
}