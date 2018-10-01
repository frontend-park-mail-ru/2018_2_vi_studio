export class Navigation {
    constructor(items) {
        this._el = document.createElement('div');
        this._el.classList.add('navigation');
        this.render(items);
    }

    render(items) {
        this._el.innerHTML = `
        <div class="navigation__content">
            ${items.map((item) => `<a class="navigation__item" href="${item.href}" data-href="${item.href}">${item.title}</a>`)
            .join('')}
        </div>`.trim();
    }

    element() {
        return this._el
    }
}