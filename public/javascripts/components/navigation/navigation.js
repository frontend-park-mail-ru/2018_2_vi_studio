import Component from "../Component.js";

export default class Navigation extends Component{
    constructor(props) {
        super(props);
    }

    getHTML() {
        return '<div class="navigation"><div class="navigation__content">' +
            this.props.items
                .map(item => `<a class="navigation__item" href="${item.href}" data-href="${item.href}">${item.title}</a>`)
                .join('') +
            '</div></div>'
    }
}