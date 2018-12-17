import Component from "../Component.js";
import VirtualDOM from "../VirtualDOM.js";
import renderErrorView from "./ErrorView.pug.js";

export default class ErrorView extends Component {
    constructor(props = {}) {
        super(VirtualDOM.createElementByHtml(renderErrorView()));
    }
}