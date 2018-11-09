import Component from "../Component.js";
import renderLeaderboard from "../leaderboard/Leaderboard.pug.js"

export default class Leaderboard extends Component {
    constructor(props) {
        super();

        this._element.outerHTML = renderLeaderboard({
            leaders: props.leaders || [],
        });
    }
}