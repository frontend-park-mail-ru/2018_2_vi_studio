export class Rules {
    constructor() {
        this._el = document.createElement('div');
        this._el.classList.add('rules');
        this.render();
    }

    render() {
        this._el.innerHTML = `
<h1>Правила игры</h1>
<p>Мы скоро их придумаем</p>`.trim();
    }

    element() {
        return this._el;
    }
}