import Scene from "./Scene.js";
import bus from '../../../bus.js';
import TileWithWays from "../graphics/TileWithWays.js";
import {EVENTS} from "../../../constants.js";
import {COLORS} from "../../config.js";

export default class TileSelectScene extends Scene {
    constructor(canvas) {
        super(canvas.getContext('2d'));
        this.canvas = canvas;

        this.tile = null;
        this.selectedTile = null;

        this.rotate = this.rotate.bind(this);
        this.submit = this.submit.bind(this);
        this.render = this.render.bind(this);
    }

    rotate() {
        if (this.selectedTile) {
            this.selectedTile.rotate();
        }

        this.tile.rotate();
        this.render();

        bus.emit(EVENTS.GAME_STATE_CHANGED, {});
    };

    submit() {
        if (this.selectedTile) {
            this.selectedTile.fillStyle = COLORS.BACKGROUND;
            let data = {
                row: this.selectedTile.row,
                col: this.selectedTile.col,
                rotationCount: this.selectedTile.rotationCount,
            };
            bus.emit(EVENTS.DONE_TRY, data);
            bus.emit(EVENTS.GAME_STATE_CHANGED, {});
        } else {
            alert('Select tile position, please!');
        }

    };

    init(state) {
        // this.state = state;
        this.tile = new TileWithWays(this.ctx, state.type);
        this.tile.x = 500;
        this.tile.y = 500;
        this.tile.id = this.push(this.tile);
    }

    // setState(state) {
    //     // this.tile.x = 500;
    //     // this.tile.y = 500;
    //     this.state = state;
    // }

    start() {
        this.render();
    }

    stop() {
        this.clear();
    }
};