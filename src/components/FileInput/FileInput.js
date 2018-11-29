import Component from "../Component.js";
import renderFileInput from "./FileInput.pug.js"
import VirtualDOM from "../VirtualDOM.js";

const FILE_NAME_PATERN = /\/([^\/]+)$/;

export default class FileInput extends Component {
    constructor(props = {}) {
        super(VirtualDOM.createElementByHtml(renderFileInput({
            name: props.name || '',
            label: props.label || '',
        })));

        const nameEl = this._element.getElementsByClassName('file-input__file-name')[0];
        const inputEl = this._element.getElementsByClassName('file-input__input')[0];

        this._element.getElementsByClassName('file-input__button')[0].addEventListener('click', event => {
            event.preventDefault();
            inputEl.click();
        });

        inputEl.addEventListener('change', () => {
            nameEl.innerText = inputEl.value.match(FILE_NAME_PATERN)[1];
        });
    }
}