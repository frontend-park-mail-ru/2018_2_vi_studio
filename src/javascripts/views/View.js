/**
 * @class BaseView
 * @module BaseView
 */

export default class View {
    constructor (el, router) {
        this.el = el;
        this.router = router;

        this.el.dataset.view = this.constructor.name;

        this.el.classList.add('hidden');
        this._active = false;
    }

    get active() {
        return this._active;
    }

    hide () {
        this.el.classList.add('hidden');
        this._active = false;
    }

    show () {
        this.el.classList.remove('hidden');
        this._active = true;
        this.render();
    }

    render() {}

    handle(args) {}
}