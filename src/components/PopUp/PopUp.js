import Component from "../Component.js";
import VirtualDOM from "../VirtualDOM.js";
import renderPopUp from "./PopUp.pug.js";
import Button from "../Button/Button.js";
import {EVENTS} from "../../constants.js";
import bus from "../../bus.js";


export default class PopUp extends Component {
    constructor() {
        super(VirtualDOM.createElementByHtml(
            renderPopUp()
        ));

        this._messageEl = this._element.getElementsByClassName('popup__message')[0];
        this._buttonsEl = this._element.getElementsByClassName('popup__buttons')[0];

        bus.on(EVENTS.ALERT, this.alert.bind(this));
    }

    alert(data = {}) {
        this._messageEl.innerText = data.message;

        let actions = data.actions || [];
        actions.push({
            name: 'Close', callback: () => {
            }
        });

        Component.render(actions.map(action => new Button({value: action.name}, () => {
            action.callback();
            this.close()
        })), this._buttonsEl);

        this._element.classList.toggle('popup_show', true);
    }

    close() {
        this._element.classList.toggle('popup_show', false);
    }
}