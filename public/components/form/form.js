import {Button} from '../button/button.js';
import {Field} from '../field/field.js';

export class Form {
    constructor(inputs) {
        this._el = document.createElement('form');
        this._el.classList.add('form');
        this.render(inputs);
    }

    render(inputs) {
        this._el.innerHTML = `<div class="form__error"></div>`;
            inputs.map(
                (item) => item.type === 'submit' ?
                    this._el.appendChild(new Button(item.type, item.label).element()) :
                    this._el.appendChild(new Field(item.type, item.name, item.label).element())
            );

            this._errorEl = this._el.getElementsByClassName('form__error')[0];
    }

    element() {
        return this._el;
    }

    showError(error) {
        this._errorEl.innerText = error;
        this._errorEl.classList.toggle('form__error_active', true);
    }
}