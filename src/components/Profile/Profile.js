import Component from "../Component.js";
import VirtualDOM from "../VirtualDOM.js";
import renderProfile from "./Profile.pug.js";
import {NO_AVATAR_PATH, IMAGES_PATH} from "../../constants.js";
import {BOT_AVATAR_PATH} from "../../constants";

export default class Profile extends Component {
    constructor(props = {}) {
        if (props.avatar !== BOT_AVATAR_PATH) {
            props.avatar = IMAGES_PATH + props.avatar;
        }

        super(VirtualDOM.createElementByHtml(renderProfile({
            avatar: props.avatar ? props.avatar : NO_AVATAR_PATH,
            name: props.name || ''
        })));
    }
}