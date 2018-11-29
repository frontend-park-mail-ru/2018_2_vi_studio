import Component from "../Component.js";
import VirtualDOM from "../VirtualDOM.js";
import renderProfile from "./Profile.pug.js";
import {NO_AVATAR_PATH, IMAGES_PATH} from "../../constants.js";

export default class Profile extends Component {
    constructor(props = {}) {
        super(VirtualDOM.createElementByHtml(renderProfile({
            avatar: props.avatar ? IMAGES_PATH + props.avatar : NO_AVATAR_PATH,
            name: props.name || ''
        })));
    }
}