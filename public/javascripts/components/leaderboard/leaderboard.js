import Component from "../Component.js";

export default class Leaderboard extends Component {
    constructor(props) {
        super(props);
    }

    getHTML() {
        return '<div class="leaders">' +
            this.props.leaders.map(item => `
                <div class="leaders__member">
                    <div class="leaders__name">${item.nickname}</div>
                    <div class="leaders__points">${item.points}</div>
                </div>`).join('').trim()
            + '</div>'
    }
}