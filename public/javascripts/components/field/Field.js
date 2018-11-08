import Component from "../Component.js";

export class Field extends Component {
    constructor(props) {
        super(props);
    }

    getHTML() {
        return `<div class="field">` +
            `<input type="${this.props.type}" name="${this.props.name}" class="field__input">` +
            `<label class="field__name">${this.props.label}</label>` +
            `</div>`
    }
}