import Component from "../Component.js";
import VirtualDOM from "../VirtualDOM.js";
import renderErrorView from "./HomeView.pug.js";
import Navigation from "../Navigation/Navigation";

export default class HomeView extends Component {
    constructor(props = {}) {
        super(VirtualDOM.createElementByHtml(renderErrorView()));

        this._contentEl = this._element.getElementsByClassName('home-view__nav')[0];
    }

    get content() {
        return this._contentEl;
    }
}