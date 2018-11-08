export default class Component {
    constructor(props) {
        this.props = props;
    }

    static render(component, element) {
        element.innerHTML = '';
        if (Array.isArray(component)) {
            return this._renderComponents(component, element);
        } else {
            return this._renderComponents([component], element);
        }
    }

    static _renderComponents(components, element) {
        components.forEach(component => {
            if (component instanceof Component) {
                element.innerHTML += component.getHTML();
            } else if (component instanceof HTMLElement) {
                element.appendChild(component);
            } else {
                throw "Component unknown type";
            }
        });
    }

    getHTML() {
        throw new Error('This method must be overridden');
    }
}