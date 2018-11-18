import PlayerComponent from "../../components/Player/Player.js"

export default class Player {
    constructor(id, nickname, avatar) {
        this.id = id;
        this.nickname = nickname;
        this.avatar = avatar;
        this._active = false;

        this._component = new PlayerComponent({nickname: nickname, avatar: avatar})
    }

    get component() {
        return this._component
    }

    activate() {
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }
}