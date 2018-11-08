import Component from "../Component.js";

export class Field extends Component {
    constructor(props) {
        super(props);
    }

    getHTML() {
        if (this.props.type === 'file') {
            return `<div class="field">` +
                `<div class="field__input field__input_no-right-padding">` +
                `<div class="field__file-name"></div>` +
                `<button class="field__file-button" onclick="event.preventDefault();this.nextSibling.click()">Choose</button>` +
                `<input type="file" size="28" name="${this.props.name}" style="visibility: hidden; position: absolute;" onchange="previousSibling.previousSibling.innerText = this.value.replace( 'C:\\\\fakepath\\\\', '' )">` +
                `</div>` +
                `<label class="field__name">${this.props.label}</label>` +
                `</div>`
        }

        return `<div class="field">` +
            `<input type="${this.props.type}" name="${this.props.name}" class="field__input">` +
            `<label class="field__name">${this.props.label}</label>` +
            `</div>`
    }
}