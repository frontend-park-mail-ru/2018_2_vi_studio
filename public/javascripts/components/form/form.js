import {Button} from '../button/button.js';
import {Field} from '../field/field.js';
import Component from "../Component.js";

export default class Form extends Component {
    constructor(props) {
        super(props);
    }

    getHTML() {
        this._formErrorId = 'form-error-' + Math.random();
        return `<form class="form"><div class="form__error" id="${this._formErrorId}"></div>` +
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
}