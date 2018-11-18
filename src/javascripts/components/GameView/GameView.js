import Component from "../Component.js";
import renderGameView from "./GameView.pug.js";
import VirtualDOM from "../VirtualDOM.js";

export default class GameView extends Component {
    constructor() {
        super(VirtualDOM.createElementByHtml(renderGameView()));

        this._playersEl = this.element.getElementsByClassName('game-view__players')[0];
        this._tileCanvas = this.element.getElementsByClassName('game-view__tile-view')[0];
        this._areaCanvas = this.element.getElementsByClassName('game-view__area')[0];
    }

    get areaCanvas() {
        return this._areaCanvas;
    }

    get players() {
        return this._playersEl;
    }

    get tileCanvas() {
        return this._tileCanvas;
    }
}