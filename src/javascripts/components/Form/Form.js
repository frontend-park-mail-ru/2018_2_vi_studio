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

        const inputs = (props.inputs || []).map(item => {
            switch (item.type) {
                case 'submit':
                    return new Button({type: 'submit', value: item.label});
                case 'file':
                    return new FileInput({label: item.label});
                default:
                    return new Field({type: item.type, name: item.name, label: item.label})
            }
        });

        Component.render([
            this._errorEl,
            ...inputs
        ], this._element)
    }

    showError(error) {
        this._errorEl.innerText = error;
        this._errorEl.classList.toggle('form__error_active', true);
    }
}