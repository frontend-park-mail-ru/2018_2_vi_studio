import Component from "../Component.js";
import renderBackground from "./Background.pug.js";
import VirtualDOM from "../VirtualDOM.js";

export default class Background extends Component {
    constructor(props) {
        super(VirtualDOM.createElementByHtml(renderBackground()));
    }
}