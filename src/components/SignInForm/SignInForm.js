import Form from "../Form/Form.js";

const inputs = [
    {label: 'Nickname', name: 'nickname', type: 'text'},
    {label: 'Password', name: 'password', type: 'password'},
    {label: 'Sign in', type: 'submit'},
];

export default class SignInForm extends Form {
    constructor(props = {}) {
        super({inputs: inputs});
        this._element.nickname.addEventListener('blur', event => {
            if (this._element.nickname.value.length === 0) {
                if (this.errors.indexOf('Wrong username or password') !== -1) {
                    this.hideError('Wrong username or password');
                }
                this.showError('Fill nickname field');
            } else {
                this.hideError('Fill nickname field');
            }
        });

        this._element.password.addEventListener('blur', event => {
            if (this._element.password.value.length === 0) {
                this.showError('Fill password field');
                if (this.errors.indexOf('Wrong username or password') !== -1) {
                    this.hideError('Wrong username or password');
                }
            } else {
                this.hideError('Fill password field');
            }
        });
    }

    isValid() {
        if (this.errors.length !== 0) {
            return false;
        }
        let valid = true;
        if (this._element.nickname.value.length === 0) {
            this.showError('Fill nickname field');
            valid = false;
        }
        if (this._element.password.value.length === 0) {
            this.showError('Fill password field');
            valid = false;
        }
        return valid;
    }

    getData() {
        return {
            nickname: this._element.nickname.value,
            password: this._element.password.value
        };
    }


}