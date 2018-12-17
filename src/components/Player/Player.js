import Component from "../Component.js";
import VirtualDOM from "../VirtualDOM.js";
import renderPlayer from "./Player.pug.js";
import {NO_AVATAR_PATH} from "../../constants.js";

export default class Player extends Component {
    constructor(props = {}) {
        super(VirtualDOM.createElementByHtml(
            renderPlayer({
                avatar: props.avatar ? props.avatar : NO_AVATAR_PATH,
                nickname: props.nickname || '',
            })
        ));

        this._iconEl = this._element.getElementsByClassName('player__icon')[0];
        this._iconEl.style.backgroundColor = props.iconColor || 'blue';

        this._progressEl = this._element.getElementsByClassName('player__progress')[0];
    }

    activate(showProgress = false) {
        this._element.classList.toggle('player_active', true);

        if (showProgress) {
            this._progressEl.classList.toggle('player__progress_hidden', false);
            this._progressEl.value = 0;
            this.intervalId = setInterval(() => {
                if (this._progressEl.value < 100) {
                    this._progressEl.value++
                } else {
                    if (this.intervalId) {
                        clearInterval(this.intervalId);
                        this.intervalId = null;
                    }
                }
            }, 150);
        }
    }

    deactivate() {
        this._element.classList.toggle('player_active', false);

        this._progressEl.classList.toggle('player__progress_hidden', true);
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}