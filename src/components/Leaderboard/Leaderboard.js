import Component from "../Component.js";
import renderLeaderboard from "./Leaderboard.pug.js"
import VirtualDOM from "../VirtualDOM.js";

export default class Leaderboard extends Component {
    constructor(props = {}) {
        super(VirtualDOM.createElementByHtml(renderLeaderboard({
            leaders: (props.leaders || []).map(leader => {
                return {nickname: leader.nickname, points: leader.points || 0}
            }),
        })));

        this._pageUpButton = this.element.getElementsByClassName('leaders__page-up')[0];
        this._pageDownButton = this.element.getElementsByClassName('leaders__page-down')[0];
    }

    get pageUpButton() {
        return this._pageUpButton;
    }

    get pageDownButton() {
        return this._pageDownButton;
    }

    pageUpButtonDisable() {
        this._pageUpButton.disabled = true;
        this._pageUpButton.classList.add('leaders__page-up_disabled');
    }

    pageDownButtonDisable() {
        this._pageDownButton.disabled = true;
        this._pageDownButton.classList.add('leaders__page-down_disabled');
    }
}