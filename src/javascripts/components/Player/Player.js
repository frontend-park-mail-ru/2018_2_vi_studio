import Component from "../Component.js";
import VirtualDOM from "../VirtualDOM.js";

export default class Player extends Component {
    constructor(props = {}) {
        super(VirtualDOM.createElementByHtml(
            `<div>${props.nickname || ''}</div>`
        ));
    }
}