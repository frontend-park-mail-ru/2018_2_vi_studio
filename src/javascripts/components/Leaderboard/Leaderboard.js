import Component from "../Component.js";
import renderLeaderboard from "./Leaderboard.pug.js"
import VirtualDOM from "../VirtualDOM.js";

export default class Leaderboard extends Component {
    constructor(props = {}) {
        super(VirtualDOM.createElementByHtml(renderLeaderboard({
            leaders: props ? props.leaders || [] : [],
        })));
    }
}