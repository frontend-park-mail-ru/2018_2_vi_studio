import Component from "../Component.js";

export class Button extends Component{
    constructor(props) {
        super(props);
    }

    getHTML() {
        this._elementId = 'form-id-' + Math.random();
        return `<input class="button" id="${this._elementId}" type="submit" value="${this.props.label}"/>`;
    }

    get element() {
        if (!this._element && this._elementId) {
            this._element = document.getElementById(this._elementId);
        }

        return this._element;
    }
}