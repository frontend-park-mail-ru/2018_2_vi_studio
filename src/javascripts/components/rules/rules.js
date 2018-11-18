import Component from "../Component.js";

export default class Rules extends Component {
    constructor(props) {
        super(props);
    }

    getHTML() {
        return '<div class="rules">' +
            '<h1>Правила игры</h1>' +
            '<p>Мы скоро их придумаем</p>' +
            '</div>'
    }
}