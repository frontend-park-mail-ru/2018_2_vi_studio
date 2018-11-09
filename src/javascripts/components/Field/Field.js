import Component from "../Component.js";
import renderField from "./Field.pug.js";

export class Field extends Component {
    constructor(props) {
        super();

        this._element.outerHTML = renderField({
            type: props.type || 'text',
            name: props.name || '',
            label: props.label || '',
        })
    }
}