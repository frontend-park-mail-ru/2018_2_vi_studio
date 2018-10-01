export class Button {
    constructor(type, label) {
        this._el = document.createElement('input');
        this._el.classList.add('button');
        this.render(type, label);
    }

    render(type, label) {
        this._el.type = type;
        this._el.value = label;
    }

    element() {
        return this._el;
    }
}