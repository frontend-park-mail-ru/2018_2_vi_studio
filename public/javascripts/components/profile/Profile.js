import Component from "../Component.js";

export default class Profile extends Component {
    constructor(props) {
        super(props);
    }

    getHTML() {
        return `<div class="profile">` +
            `<img class="profile__avatar" src="${this.props && this.props.avatar ? this.props.avatar : '/public/images/no-avatar.jpg'}"/>` +
            `<div class="profile__name">${this.props.name}</div>` +
            `</div>`;
    }
}