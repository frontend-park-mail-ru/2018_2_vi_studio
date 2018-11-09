import Component from "../Component.js";
import renderBackground from "./Background.pug.js";

export default class Background extends Component {
    constructor(props) {
        super();

        this._element.outerHTML = renderBackground(props);
    }
}