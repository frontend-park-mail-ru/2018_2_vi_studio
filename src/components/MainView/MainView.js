import Component from "../Component.js";
import VirtualDOM from "../VirtualDOM.js";
import renderMainView from "./MainView.pug.js";

export default class MainView extends Component {
    constructor() {
        super(VirtualDOM.createElementByHtml(renderMainView()));

        this._contentEl = this._element.getElementsByClassName('main-view__content')[0];
        this._navEl = this._element.getElementsByClassName('main-view__nav-container')[0];
        this._asideToggleButton = this._element.getElementsByClassName('main-view__aside-toggle')[0];

        this._asideToggleButton.addEventListener('click', this._toggleNav.bind(this));

        this._navEl.addEventListener('click', this._toggleNav.bind(this));
    }

    get content() {
        return this._contentEl;
    }

    get nav() {
        return this._navEl;
    }

    _toggleNav () {
        this._navEl.classList.toggle('main-view__nav-container_show');
        this._contentEl.classList.toggle('main-view__content_hide');
    }
}