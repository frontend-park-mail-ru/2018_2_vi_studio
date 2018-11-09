import Component from "../Component.js";

export default class Button extends Component {
    constructor(props) {
        super();

        this._element.outerHTML = `<input class="button" type="${props.type || 'Button'}" value="${props.value || ''}"/>`;
    }
}