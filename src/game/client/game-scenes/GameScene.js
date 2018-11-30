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

    init(players) {
        this.tileMap = new TileMap(players);
        this.tileMap.tiles.forEach(tileLine => tileLine.filter(tile => tile).forEach(tile => this.push(tile)));
        this.tileMap.stones.forEach(stone => this.push(stone));
    }

    destroy() {
        if (this.requestFrameId) {
            window.cancelAnimationFrame(this.requestFrameId);
            this.requestFrameId = null;
        }

        this.clear();
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
};