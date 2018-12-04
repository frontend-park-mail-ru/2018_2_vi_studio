import Component from "../Component.js";
import VirtualDOM from "../VirtualDOM.js";
import renderMainView from "./MainView.pug.js";

export default class MainView extends Component {
    constructor() {
        super(VirtualDOM.createElementByHtml(renderMainView()));

        this._contentEl = this._element.getElementsByClassName('main-view__content')[0];
        this._asideContentEl = this._element.getElementsByClassName('main-view__aside-content')[0];
        this._asideEl = this._element.getElementsByClassName('main-view__aside')[0];
        this._asideToggleButton = this._element.getElementsByClassName('main-view__aside-toggle')[0];

        this._asideToggleButton.addEventListener('click', this._toggleNav.bind(this));

        this._asideContentEl.addEventListener('click', this._toggleNav.bind(this));
    }

    get content() {
        return this._contentEl;
    }

    get asideContent() {
        return this._asideContentEl;
    }

    _toggleNav () {
        this._asideEl.classList.toggle('main-view__aside_show');
        this._contentEl.classList.toggle('main-view__content_hide');
    }
}