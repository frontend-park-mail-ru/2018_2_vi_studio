import Component from "../Component.js";
import VirtualDOM from "../VirtualDOM.js";

export default class Button extends Component {
    constructor(props = {}) {
        super(VirtualDOM.createElementByHtml(
            `<input class="button" type="${props.type || 'Player'}" value="${props.value || ''}"/>`
        ));
    }
}