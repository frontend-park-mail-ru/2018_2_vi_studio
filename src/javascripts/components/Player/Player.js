import Component from "../Component.js";
import VirtualDOM from "../VirtualDOM.js";

export default class Player extends Component {
    constructor(props = {}) {
        super(VirtualDOM.createElementByHtml(
            `<div class="player"><img src="/src/images/32c74035bac6fb7636c12d51130e846f.png" class="player__avatar"/><div class="player__name">${props.nickname || ''}</div></div>`
        ));
    }

    activate() {
        this._element.classList.add('player_active');
    }

    deactivate() {
        this._element.classList.remove('player_active');
    }


}