import Component from "../Component.js";
import Background from "../Background/Background.js"

export default class MainView extends Component {
    constructor() {
        super();

        this._element = document.createElement('section');
        this._element.className = 'main-view';

        this._contentEl = document.createElement('div');
        this._contentEl .className = 'main-view__content';

        this._navEl = document.createElement('nav');
        this._navEl.className = 'main-view__aside';

        Component.render([
            new Background(),
            this._navEl,
            this._contentEl
        ], this._element);
    }

    get content() {
        return this._contentEl;
    }

    get nav() {
        return this._navEl;
    }
}