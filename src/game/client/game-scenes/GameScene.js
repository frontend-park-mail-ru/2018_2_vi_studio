import Scene from "./Scene.js";
import {TileMap} from "../graphics/TileMap.js";

export default class GameScene extends Scene{
    constructor(canvas) {
        super(canvas.getContext('2d'));
        this._width = canvas.width;
        this._height = canvas.height;
        this._canvasSize = canvas.getBoundingClientRect().height;

        this.requestFrameId = null;
        this.render = this.render.bind(this);
    }

    get canvasSize() {
        return this._canvasSize;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    init(state) {
        console.log('Game-Scenes: init');
        this.state = state;

        this.tileMap = new TileMap(this.ctx);
        this.tileMap.x = 0;
        this.tileMap.y = 5;

        this.tileMap.init(state);

        this.tileMap.tiles.forEach(tileLine => tileLine.filter(tile => tile).forEach(tile => this.push(tile)));
        this.tileMap.stones.forEach(stone => this.push(stone));
    }


    setState(state) {
        this.state = state;
    }

    start() {
        console.log('mainScene: start');
        this.render();
    }

    stop() {
        if (this.requestFrameId) {
            window.cancelAnimationFrame(this.requestFrameId);
            this.requestFrameId = null;
        }

        this.clear();
    }
};