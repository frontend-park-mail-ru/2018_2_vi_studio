export class Leaderboard {
    constructor(leaders) {
        this._el = document.createElement('div');
        this._el.classList.add('leaders');
        this.render(leaders);
    }

    render(leaders) {
        this._el.innerHTML = leaders.map((item) => `
<div class="leaders__member">
    <div class="leaders__name">${item.nickname}</div>
    <div class="leaders__points">${item.points}</div>
</div>`).join('').trim();
    }

    element() {
        return this._el;
    }
}