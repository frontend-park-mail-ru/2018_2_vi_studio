import {Button} from '../button/Button.js';
import {Field} from '../field/Field.js';
import Component from "../Component.js";

export default class Form extends Component {
    constructor(props) {
        super(props);
    }

    getHTML() {
        this._elementId = 'form-id-' + Math.random();
        this._formErrorId = 'form-error-' + Math.random();
        return `<form class="form" id="${this._elementId}"><div class="form__error" id="${this._formErrorId}"></div>` +
            this.props.inputs.map(item => item.type === 'submit' ?
                new Button(item).getHTML() :
                new Field(item).getHTML()
            ).join('') +
            '</form>'
    }

    showError(error) {
        if (!this._formError) {
            this._formError = document.getElementById(this._formErrorId);
        }

        this._formError.innerText = error;
        this._formError.classList.toggle('form__error_active', true);
    }

    get element() {
        if (!this._element && this._elementId) {
            this._element = document.getElementById(this._elementId);
        }

        return this._element;
    }
}