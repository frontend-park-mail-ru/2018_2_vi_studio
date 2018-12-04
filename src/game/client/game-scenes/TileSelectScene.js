import Scene from "./Scene.js";
import bus from '../../../bus.js';
import TileWithWays from "../graphics/TileWithWays.js";
import {EVENTS} from "../../../constants.js";
import {COLORS} from "../../config.js";

const TILE_SELECT_SCENE_CENTER = 500;

export default class TileSelectScene extends Scene {
    constructor(canvas) {
        super(canvas.getContext('2d'));
        this.canvas = canvas;

        this.selectedTile = null;

        this.rotate = this.rotate.bind(this);
        this.submit = this.submit.bind(this);
        this.render = this.render.bind(this);

        this.tile = new TileWithWays(this._ctx, null);

        this.tile.x = TILE_SELECT_SCENE_CENTER;
        this.tile.y = TILE_SELECT_SCENE_CENTER;
        this.tile.id = this.push(this.tile);
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

    destroy() {
        this.clear();
    }
};