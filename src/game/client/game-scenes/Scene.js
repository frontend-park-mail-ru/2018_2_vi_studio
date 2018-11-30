export default class Scene {
    constructor(ctx) {
        this._ctx = ctx;
        this._figures = {};

        this._id = 0;
    }

    ID() {
        return `#${this._id++}`;
    }

    push(figure) {
        const id = this.ID();
        this._figures[id] = figure;
        return id;
    }


    remove(id) {
        const figure = this._figures[id];
        this.backView = this.backView.filter(item => item !== figure);
        this.frontView = this.frontView.filter(item => item !== figure);

        delete this._figures[id];
    }

    render() {
        const ctx = this._ctx;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        Object.keys(this._figures).forEach(key => this._figures[key].render(ctx));
    }

    clear() {
        const ctx = this._ctx;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}