import Component from "../Component.js";
import VirtualDOM from "../VirtualDOM.js";
import renderVideo from "./Video.pug.js";

export default class Video extends Component {
    constructor() {
        super(VirtualDOM.createElementByHtml(renderVideo()));
    }
}