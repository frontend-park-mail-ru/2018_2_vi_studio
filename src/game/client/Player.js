import PlayerComponent from "../../components/Player/Player.js";

export default class Player {
    constructor(id, nickname, avatar, color) {
        this.id = id;
        this.nickname = nickname;
        this.avatar = avatar;
        this._active = false;
        this.points = 0;

        this._component = new PlayerComponent({nickname: nickname, avatar: avatar, iconColor: color});
    }

    get component() {
        return this._component;
    }

    isActive() {
        return this._active;
    }

    activate(showProgress = false) {
        this._component.activate(showProgress);
        this._active = true;
    }

    deactivate() {
        this._component.deactivate();
        this._active = false;
    }
}