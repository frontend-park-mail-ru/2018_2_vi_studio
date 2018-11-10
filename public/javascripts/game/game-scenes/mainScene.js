import {Scene} from "../graphics/scene.js";
import bus from '../../bus.js';
import {TileMap} from "../graphics/TileMap.js";


export class GameScene {
    constructor(canvas) {
        this.canvas = canvas;
        const ctx = canvas.getContext('2d');
        this.ctx = ctx;
        this.scene = new Scene(ctx);
        this.state = null;
        this.requestFrameId = null;


        this.canvasRectLen = canvas.getBoundingClientRect().height;
        this.renderScene = this.renderScene.bind(this);
    }

    init(state) {
        // Установка начальных данных
        const ctx = this.ctx;
        const scene = this.scene;
        console.log('Game-Scenes: INIT');
        this.state = state;

        this.tileMap = new TileMap(ctx);
        this.tileMap.x = 0;
        this.tileMap.y = 5;
        this.tileMap.init();
        for (let i = 0; i < this.tileMap.rows; i++) {
            for (let j = 0; j < this.tileMap.columns; j++) {

                this.scene.push(this.tileMap.tiles[i][j]);
            }
        }

        // this.tileMap.id = scene.push(this.tileMap);

    }

    setState(state) {
        const scene = this.scene;
        this.state = state;
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