const COOKIE = window.CookieModule;

(function () {
    const noop = () => null;

    class AjaxModule {
        constructor() {
            this._path = 'http://127.0.0.1:8080';
        }

        getLeaders(onFulfilled, onRejected) {
            fetch(
                this._path+'/resource/leaders'
            ).then(response => {
                return response.json();
            }).then(onFulfilled, onRejected);
        }

        getProfile(onFulfilled, onRejected) {
            const accessToken = COOKIE.getCookie('access_token');
            if (accessToken === undefined) {
                onRejected();
            }

            fetch(
                this._path+'/resource/profile',
                {
                    headers: new Headers({
                        'Authorization': accessToken,
                    })

                }
            ).then(response => {
                return response.json();
            }).then(onFulfilled, onRejected);
        }


        authorize(data, onFulfilled, onRejected) {
            fetch(
                this._path+'/auth/sign-in',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            ).then(response => {
                return response.json();
            }).then(onFulfilled, onRejected);
        }

        register(data, onFulfilled, onRejected) {
            fetch(
                this._path+'/auth/sign-up',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            ).then(onFulfilled, onRejected);
        }
    }

    window.AjaxModule = new AjaxModule();
})();
