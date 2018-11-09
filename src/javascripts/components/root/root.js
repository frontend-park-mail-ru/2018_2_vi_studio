import {Form} from "../Form/Form.js";
import {Leaderboard} from "../leaderboard/Leaderboard.js";
import {Rules} from "../rules/rules.js";
import {Video} from "../video/video.js";
import {Auth} from '../../modules/data-source.js.tmp';
import {DataSource} from "../../modules/data-source.js.tmp";

export class Root {
    constructor(renderNav) {
        this._el = document.createElement('div');
        this._el.classList.add('root');
        this.renderHome();
        this._renderNav =renderNav;
    }

    element() {
        return this._el;
    }
}