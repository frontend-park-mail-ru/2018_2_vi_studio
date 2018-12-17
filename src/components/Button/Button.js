import Component from "../Component.js";
import VirtualDOM from "../VirtualDOM.js";

export default class Button extends Component {
    constructor(props = {}, callback) {
        super(VirtualDOM.createElementByHtml(
            `<input class="button" type="${props.type || 'button'}" value="${props.value || ''}"/>`
        ));

        if (callback) {
            this._element.addEventListener("click", callback);
        }
    }
}