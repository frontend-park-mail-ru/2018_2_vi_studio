import Form from "../Form/Form.js";

const inputs = [
    {label: 'Nickname', name: 'nickname', type: 'text'},
    {label: 'E-mail', name: 'email', type: 'email'},
    {label: 'Password', name: 'password', type: 'password'},
    {label: 'Repeat password', name: 'rep_password', type: 'password'},
    {label: 'Sign up', type: 'submit'},
];

export default class SignUpForm extends Form {
    constructor(props = {}) {
        super({inputs: inputs});
        this._element.nickname.addEventListener('blur', event => {
            if (this.errors.indexOf('Error') !== -1) {
                this.hideError('Error');
            }
            if (this._element.nickname.value.length === 0) {
                this.showError('Fill nickname field');
            } else {
                this.hideError('Fill nickname field');
            }
        });

        this._element.email.addEventListener('blur', event => {
            if (this.errors.indexOf('Error') !== -1) {
                this.hideError('Error');
            }
            if (this._element.email.value.length === 0) {
                this.showError('Fill email field');
            } else {
                this.hideError('Fill email field');
            }
        });

        this._element.password.addEventListener('blur', event => {
            if (this.errors.indexOf('Error') !== -1) {
                this.hideError('Error');
            }
            if (this.errors.indexOf('Passwords do not match') !== -1) {
                this.hideError('Passwords do not match');
            }
            if (this._element.password.value.length === 0) {
                this.showError('Fill password field');
            } else if (this._element.rep_password.value.length !== 0) {
                if (this._element.rep_password.value !== this._element.password.value) {
                    this.showError('Passwords do not match');
                } else {
                    this.hideError('Passwords do not match');
                }
            }else {
                this.hideError('Fill password field');
            }
        });

        this._element.rep_password.addEventListener('blur', event => {
            if (this.errors.indexOf('Error') !== -1) {
                this.hideError('Error');
            }
            if (this._element.rep_password.value !== this._element.password.value) {
                this.showError('Passwords do not match');
            } else {
                this.hideError('Passwords do not match');
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
        if (this._element.email.value.length === 0) {
            this.showError('Fill email field');
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
            email: this._element.email.value,
            password: this._element.password.value,
        };
    }
}