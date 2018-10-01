export class Button {
    constructor(type, value) {
        this._el = document.createElement('input');
        this._el.classList.add('button');
        this.render(type, value);
    }

    render(type, value) {
        this._el.type = type;
        this._el.value = value;
    }

    element() {
        return this._el;
    }
}