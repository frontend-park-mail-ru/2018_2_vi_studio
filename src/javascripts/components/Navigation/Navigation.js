import Component from "../Component.js";
import renderNavigation from "./Navigation.pug.js";
import VirtualDOM from "../VirtualDOM.js";

export default class Navigation extends Component {
    constructor(props = {}) {
        super(VirtualDOM.createElementByHtml(renderNavigation({
            items: props.items || []
        })));
    }
}