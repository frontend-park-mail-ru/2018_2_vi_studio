import Component from "../Component.js";
import renderFileInput from "./FileInput.pug.js"
import VirtualDOM from "../VirtualDOM.js";

export default class FileInput extends Component {
    constructor(props = {}) {
        super(VirtualDOM.createElementByHtml(renderFileInput({
            name: props.name || '',
            label: props.label || '',
        })));

        console.log(this.element);
        const nameEl = this._element.getElementsByClassName('file-input__name')[0];

        this._element.getElementsByClassName('file-input__button')[0].addEventListener('click', event => {
            event.preventDefault();
            this.nextSibling.click();
        });

        this._element.getElementsByClassName('file-input__input')[0].addEventListener('change', () => {
            nameEl.innerText = this.value.replace('C:\\\\fakepath\\\\', '');
        });
    }
}