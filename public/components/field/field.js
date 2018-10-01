export class Field {
    constructor(type, name, label) {
        this._el = document.createElement('div');
        this._el.classList.add('field');
        this.render(type, name, label);
    }

    render(type, name, label) {
        this._el.innerHTML = `
        <input type="${type}" name="${name}" class="field__input">
        <label class="field__name">${label}</label>`.trim();
    }

    element() {
        return this._el;
    }
}