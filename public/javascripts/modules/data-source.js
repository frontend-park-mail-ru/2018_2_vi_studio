const path = 'http://127.0.0.1:8080';
const noop = () => {
};

export class DataSource {
    static getLeaders(onFulfilled, onRejected) {
        fetch(
            path + '/resource/leaders'
        ).then(response => {
            return response.json();
        }).then(onFulfilled, onRejected);
    }

    static getProfile(onFulfilled = noop, onRejected = noop) {
        fetch(
            path + '/resource/profile',
            {
                credentials: "include"
            }
        ).then(response => {
            return response.json();
        }).then(obj => {
            onFulfilled(obj);
        }, onRejected);
    }
}

export class Auth {
    static signIn(data, onFulfilled, onRejected) {
        fetch(
            path + '/auth/sign-in',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: "include"
            }
        ).then(response => {
            return response.json();
        }).then(obj => {
            onFulfilled(obj);
        }, onRejected);
    }

    static signOut(onFulfilled) {
        fetch(
            path + '/auth/sign-out',
            {
                credentials: "include"
            }
        ).then(onFulfilled);
    }

    static signUp(data, onFulfilled, onRejected) {
        fetch(
            path + '/auth/sign-up',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: "include"
            }
        ).then(onFulfilled, onRejected);
    }
}