import Component from "../Component.js";
import renderGameView from "./GameView.pug.js";
import VirtualDOM from "../VirtualDOM.js";

export default class GameView extends Component {
    constructor() {
        super(VirtualDOM.createElementByHtml(renderGameView()));

        this._playersEl = this.element.getElementsByClassName('game-view__players')[0];
        this._tileCanvas = this.element.getElementsByClassName('game-view__tile-view')[0];
        this._boardCanvas = this.element.getElementsByClassName('game-view__area')[0];
        this._submitButton = this.element.getElementsByClassName('game-view__submit-button')[0];
        this._quitButton = this.element.getElementsByClassName('game-view__quit-button')[0];

        this.resize = this.resize.bind(this);
    }

    get boardCanvas() {
        return this._boardCanvas;
    }

    get playersRoot() {
        return this._playersEl;
    }

    get tileCanvas() {
        return this._tileCanvas;
    }

    get quitButton() {
        return this._quitButton;
    }

    get submitButton() {
        return this._submitButton;
    }

    resize() {
        const height = this._element.offsetHeight;
        const width = this._element.offsetWidth;

        let step;
        if (width > height) {
            step = Math.floor(Math.min(width / 3, height / 2));
        } else {
            step = Math.floor(Math.min(width / 2, height / 3));
        }

        this._boardCanvas.width = 2 * step;
        this._boardCanvas.height = 2 * step;
        this._tileCanvas.width = step;
        this._tileCanvas.height = step;
    }

    get loading() {
        return this.element.getElementsByClassName('game-view__loading')[0];
    }
}