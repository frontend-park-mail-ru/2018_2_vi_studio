import Component from "../Component.js";
import renderField from "./Field.pug.js";
import VirtualDOM from "../VirtualDOM.js";

export default class Field extends Component {
    constructor(props = {}) {
        super(VirtualDOM.createElementByHtml(renderField({
            type: props.type || 'text',
            name: props.name || '',
            label: props.label || '',
        })));
    }
}