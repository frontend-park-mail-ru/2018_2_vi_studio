export default class Drawable {
    render(ctx) {
        ctx.save();
        this._setup(ctx);
        this._draw(ctx);
        ctx.restore();
    }

    _setup() {
        throw new Error('This method must be overridden');
    }

    _draw() {
        throw new Error('This method must be overridden');
    }
}
