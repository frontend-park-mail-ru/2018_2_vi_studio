import Component from "../Component.js";
import VirtualDOM from "../VirtualDOM.js";
import renderProfile from "./Profile.pug.js";
import {SERVER_PATH} from "../../constants.js";

const AVATAR_PATH = SERVER_PATH + '/media/images/';

export default class Profile extends Component {
    constructor(props = {}) {
        super(VirtualDOM.createElementByHtml(renderProfile({
            avatar: props.avatar ? AVATAR_PATH + props.avatar : '/src/images/no-avatar.jpg',
            name: props.name || ''
        })));
    }
}