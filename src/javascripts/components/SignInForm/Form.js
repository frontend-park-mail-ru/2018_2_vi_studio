import Form from "../Form/Form.js";

const inputs = [
    {label: 'Nickname', name: 'nickname', type: 'text'},
    {label: 'Password', name: 'password', type: 'password'},
    {label: 'Sign in', type: 'submit'},
];

export default class SignInForm extends Form {
    constructor(props = {}) {
        super({inputs: inputs});
    }

    getData() {
        return {
            nickname: this._element.nickname.value,
            password: this._element.password.value
        }
    }
}