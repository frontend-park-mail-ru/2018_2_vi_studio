import Component from "../Component.js";
import renderFileInput from "FileInput.pug.js"

export class FileInput extends Component {
    constructor(props) {
        super();

        this._element.outerHTML = renderFileInput({
            name: props.name || '',
            label: props.label || '',
        });

        const nameEl = this.element.getElementsByClassName('file-input__name')[0];

        this.element.getElementsByClassName('file-input__button')[0].addEventListener('click', event => {
            event.preventDefault();
            this.nextSibling.click()
        });

        this.element.getElementsByClassName('file-input__input')[0].addEventListener('change', () => {
            nameEl.innerText = this.value.replace('C:\\\\fakepath\\\\', '');
        });
    }
}