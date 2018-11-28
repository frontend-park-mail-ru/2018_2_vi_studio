import Component from "../Component.js";
import VirtualDOM from "../VirtualDOM.js";
import renderRules from "./Rules.pug.js";

export default class Rules extends Component {
    constructor() {
        super(VirtualDOM.createElementByHtml(renderRules()));
    }
}