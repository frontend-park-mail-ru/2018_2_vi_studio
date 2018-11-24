import Scene from "./Scene.js";
import bus from '../../../bus.js';
// import {TileMap} from "../graphics/TileMap.js";
import {TileWithWays} from "../graphics/TileWithWays.js";
import EVENTS from "../../../events.js";
import {COLORS} from "../gameConfig.js";

export default class TileSelectScene {
    constructor(canvas) {
        this.canvas = canvas;
        const ctx = canvas.getContext('2d');
        this.ctx = ctx;
        this.scene = new Scene(ctx);
        this.state = null;
        this.requestFrameId = null;

        this.rotate = this.rotate.bind(this);
        this.submit = this.submit.bind(this);
        this.selectedTile = null;
        this.tile = null;

        this.canvasRectLen = canvas.getBoundingClientRect().height;
        this.renderScene = this.renderScene.bind(this);
    }

    rotate(){
        // console.log('rotate');
        if (this.selectedTile) {
            this.selectedTile.rotate();
        }
        this.tile.rotate();
        this.renderScene();

        bus.emit(EVENTS.GAME_STATE_CHANGED, {});
    };

    submit(){
        console.log('submit');
        if (this.selectedTile) {
            this.selectedTile.fillStyle = COLORS.BACKGROUND;
            let data = {
                row: this.selectedTile.row,
                col: this.selectedTile.col,
                rotationCount: this.selectedTile.rotationCount,
            };
            bus.emit('game-event-DoneTry', data);
            bus.emit(EVENTS.GAME_STATE_CHANGED, {});

            // this.selectedTile = null;

        } else {
            alert('Select tile position, please!');
        }

    };

    init(state) {
        // Установка начальных данных
        const ctx = this.ctx;
        const scene = this.scene;

        this.state = state;
        this.tile = new TileWithWays(this.ctx, state.type);
        this.tile.x = 200;
        this.tile.y = 200;
        this.tile.id = scene.push(this.tile);
        // console.log('MINI-Scene: INIT', state);
        // this.tileMap.id = scene.push(this.tileMap);

    }

    setState(state) {
        this.tile.x = 200;
        this.tile.y = 200;
        const scene = this.scene;
        this.state = state;
        // console.log('MINI-Scene: setState', this.tile);
        // обратотать данные пришедшие с сервера

    }

    renderScene() {
        const ctx = this.ctx;
        const scene = this.scene;
        scene.render();

    }

    start() {
        // this.lastFrameTime = performance.now();
        // this.requestFrameId = requestAnimationFrame(this.renderScene);

        this.renderScene();
        // console.log('MINI-Scene: start', this.tile);
    }

    stop() {
        this.scene.clear();
    }

    // destroy() {
    //     bus.off(this.rotateBtn.onclick, this.onRotateBtnClick);
    // }
};