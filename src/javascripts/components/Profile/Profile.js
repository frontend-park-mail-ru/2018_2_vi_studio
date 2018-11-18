import Component from "../Component.js";
import VirtualDOM from "../VirtualDOM.js";
import renderProfile from "./Profile.pug.js";

export default class Profile extends Component {
    constructor(props = {}) {
        super(VirtualDOM.createElementByHtml(renderProfile({
            avatar: props.avatar || '/src/images/no-avatar.jpg',
            name: props.name || ''
        })));
    }
}