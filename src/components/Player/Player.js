import Component from "../Component.js";
import VirtualDOM from "../VirtualDOM.js";
import renderPlayer from "./Player.pug.js";

export default class Player extends Component {
    constructor(props = {}) {
        super(VirtualDOM.createElementByHtml(
            renderPlayer({
                avatar: props.avatar || '/src/images/no-avatar.jpg',
                nickname: props.nickname || '',
            })
        ));

        this._progressEl = this._element.getElementsByClassName('player__progress')[0];
    }

    activate(showProgress = false) {
        this._element.classList.toggle('player_active', true);

        if (showProgress) {
            this._progressEl.classList.toggle('player__progress_hidden', false);
            this._progressEl.value = 0;
            const intervalId = setInterval(() => {
                if (this._progressEl.value < 100) {
                    this._progressEl.value++
                } else {
                    clearInterval(intervalId)
                }
            }, 150);
        }
    }

    deactivate() {
        this._element.classList.toggle('player_active', false);

        this._progressEl.classList.toggle('player__progress_hidden', true);
    }
}