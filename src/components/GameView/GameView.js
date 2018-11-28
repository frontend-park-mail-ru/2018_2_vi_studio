import Component from "../Component.js";
import renderGameView from "./GameView.pug.js";
import VirtualDOM from "../VirtualDOM.js";

export default class GameView extends Component {
    constructor() {
        super(VirtualDOM.createElementByHtml(renderGameView()));

        this._playersEl = this.element.getElementsByClassName('game-view__players')[0];
        this._tileCanvas = this.element.getElementsByClassName('game-view__tile-view')[0];
        // TODO: rewrite style name
        this._boardCanvas = this.element.getElementsByClassName('game-view__area')[0];
        this._rotateButton = this.element.getElementsByClassName('game-view__rotate-button')[0];
        this._submitButton = this.element.getElementsByClassName('game-view__submit-button')[0];
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

    get rotateButton() {
        return this._rotateButton;
    }

    get submitButton() {
        return this._submitButton;
    }
}