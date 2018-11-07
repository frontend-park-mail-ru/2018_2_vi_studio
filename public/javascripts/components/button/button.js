import Component from "../Component.js";

export class Button extends Component{
    constructor(props) {
        super(props);
    }

    getHTML() {
        return `<input class="button" type="submit" value="${this.props.label}"/>`;
    }
}