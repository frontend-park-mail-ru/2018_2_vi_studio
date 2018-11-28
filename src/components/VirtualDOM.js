class VirtualDOM {
    constructor() {
        this._root = document.createElement('template');
    }

    createElementByHtml(html) {
        this._root.innerHTML = html;
        const element = this._root.content.firstChild;
        this._root.innerHTML = '';
        return element;
    }
}

export default new VirtualDOM();