export default class Controller {
    constructor (View) {
        this._view = new View();
        this._element = this._view.element;
    }

    get element() {
        return this._element;
    }

    handle(args) {
        throw new Error('This method must be overridden');
    }
}