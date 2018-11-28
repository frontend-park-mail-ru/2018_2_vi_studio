import Scene from "./Scene.js";
import {TileMap} from "../graphics/TileMap.js";

export default class GameScene {
    constructor(canvas) {
        this.canvas = canvas;
        const ctx = canvas.getContext('2d');
        this.ctx = ctx;
        this.scene = new Scene(ctx);
        // this.state = null;
        this.requestFrameId = null;

        this.renderScene = this.renderScene.bind(this);
    }

    get canvasRectLen() {
        return this.canvas.getBoundingClientRect().height
    }

    init(state) {
        // Установка начальных данных
        const ctx = this.ctx;
        const scene = this.scene;
        console.log('GameController-Scenes: init');
        this.state = state;

        this.tileMap = new TileMap(ctx);
        this.tileMap.x = 0;
        this.tileMap.y = 5;
        // this.tileMap.init(state.stones);

        // TODO: rewrite
        this.tileMap.init(state.stones);

        this.tileMap.tiles.forEach(tileLine => tileLine.forEach(tile => scene.push(tile)));
        // for (let i = 0; i < this.tileMap.rows; i++) {
        //     for (let j = 0; j < this.tileMap.columns; j++) {
        //         scene.push(this.tileMap.tiles[i][j]);
        //     }
        // }
        this.tileMap.stones.forEach(stone => scene.push(stone));
    }


    setState(state) {
        // const scene = this.scene;
        this.state = state;
    }

    renderScene() {
        // const ctx = this.ctx;
        // const scene = this.scene;
        // scene.render();
        this.scene.render();
    }

    start() {
        // this.lastFrameTime = performance.now();
        // this.requestFrameId = requestAnimationFrame(this.renderScene);

        console.log('mainScene: start');
        this.renderScene();
    }

    stop() {
        if (this.requestFrameId) {
            window.cancelAnimationFrame(this.requestFrameId);
            this.requestFrameId = null;
        }

        this.scene.clear();
    }
};