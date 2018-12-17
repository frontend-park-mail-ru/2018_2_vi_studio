import Scene from "./Scene.js";
import {TileMap} from "../graphics/TileMap.js";

export default class GameScene extends Scene{
    constructor(canvas) {
        super(canvas.getContext('2d'));
        this._canvas = canvas;

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
        return this._canvas.getBoundingClientRect().height;
    }

    get width() {
        return this._canvas.width;
    }

    get height() {
        return this._canvas.height;
    }
};