export default class Player {
    constructor(id, username, avatar) {
        this.id = id;
        this.username = username;
        this.avatar = avatar;
        this.active = false;
    }

    getData() {
        return {
            id: this.id,
            username: this.username,
            avatar: this.avatar,
        };
    }
}