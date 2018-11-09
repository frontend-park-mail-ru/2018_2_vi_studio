/**
 * @class BaseView
 * @module BaseView
 */

export default class Controller {
    constructor () {
        this._element = document.createElement('section');
        this._active = true;
    }

    get active() {
        return this._active;
    }

    get element() {
        return this._element;
    }

    hide () {
        this._element.classList.add('hidden');
        this._active = false;
    }

    show () {
        this._element.classList.remove('hidden');
        this._active = true;
        this.render();
    }

    handle(args) {
        throw new Error('This method must be overridden');
    }
}