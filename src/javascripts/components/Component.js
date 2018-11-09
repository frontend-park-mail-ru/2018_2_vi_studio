export default class Component {
    constructor() {
        this._element = document.createElement('div');
    }

    get element() {
        return this._element;
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
                element.appendChild(component.element);
            } else if (component instanceof HTMLElement) {
                element.appendChild(component);
            } else {
                throw new Error('Component unknown type');
            }
        });
    }
}