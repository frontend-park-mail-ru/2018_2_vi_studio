import Button from '../Button/Button.js';
import Field from '../Field/Field.js';
import Component from "../Component.js";
import FileInput from "../FileInput/FileInput.js";


export default class Form extends Component {
    constructor(props = {}) {
        super();

        this._element = document.createElement('form');
        this._element.className = 'form';

        this._errorEl = document.createElement('div');
        this._errorEl.className = 'form__error';

        this.inputs = (props.inputs || []).map(item => {
            switch (item.type) {
                case 'submit':
                    return new Button({type: 'submit', value: item.label});
                case 'file':
                    return new FileInput({label: item.label});
                default:
                    return new Field({type: item.type, name: item.name, label: item.label});
            }
        });

        this.errors = [];

        Component.render([
            this._errorEl,
            ...this.inputs
        ], this._element);
    }

    _getErrorText(){
        let error_text = '';
        if (this.errors.length === 1) {
            error_text += this.errors[0];
        } else {
            error_text += this.errors[0];
            for(let i = 1; i < this.errors.length; i++) {
                error_text += '\n' + this.errors[i];
            }
        }
        return error_text;
    }

    showError(error) {
        if(this.errors.indexOf(error) === -1) {
            this.errors.push(error);
        }
        this._errorEl.innerText = this._getErrorText();
        this._errorEl.classList.toggle('form__error_active', true);
    }

    hideError(error) {
        this.errors = this.errors.filter(e => e !== error)
        if (this.errors.length === 0) {
            this._errorEl.classList.toggle('form__error_active', false);
        } else {
            this._errorEl.innerText = this._getErrorText();
            this._errorEl.classList.toggle('form__error_active', true);
        }
    }
}