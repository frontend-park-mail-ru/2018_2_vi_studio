import {EVENTS} from "./core/events.js";
import bus from "../../bus.js";


class GameControllers {
    constructor(root) {
        this.root = root;
        this.previous = {};
        this.keys = {};
        this.clickEvent = {};

        this._onClick = this._keyHandler.bind(this, 'click');
    }

    /**
     * Начинаем слушать события клавиатуры
     */
    start() {

        console.log("GameControllers: Start");
        this.root.addEventListener('click', this._onClick);
    }

    /**
     * Прекращаем слушать события клавиатуры
     */
    destroy() {
        // document.removeEventListener('keydown', this._onPress);
        // document.removeEventListener('keyup', this._onUp);
        this.root.removeEventListener('click', this._onClick);

    }

    /**
     * Нажата ли клавиша?
     * @param  {string}  key
     * @return {boolean}
     */
    is(key) {
        return this.keys[key];
    }

    /**
     * Обработчик события
     * @param  {string} type
     * @param  {MouseEvent} event
     */
    _keyHandler(type, event) {
        console.log(type, event);
        if (type === 'click') {
            this.clickEvent['event'] = event;
            bus.emit(EVENTS.MOUSE_CLICKED, event);
        }
    }

}
// const controlls = new GameControllers();
export {GameControllers};