import Component from "../Component.js";
import renderGameView from "./GameView.pug.js";

export default class GameView extends Component {
    constructor() {
        super();

        this._element = renderGameView();

        this._playersEl = this.element.getElementsByClassName('game-view__players')[0];
        this._tileViewEl = this.element.getElementsByClassName('game-view__tile-view')[0];
    }

    get players() {
        return this._playersEl;
    }

    get tileView() {
        return this._tileViewEl;
    }
}