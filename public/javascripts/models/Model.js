// TODO: rewrite
window.SERVER_PATH = 'http://127.0.0.1:8080';

export default class Model {
    constructor() {
        this.path = window.SERVER_PATH;
    }

    getAll() {
        return fetch(
            this.path,
            {credentials: "include"}
        ).then(response => response.json())
    }

    get(id) {
        return fetch(
            this.path + '/' + id,
            {credentials: "include"}
        ).then(response => response.json())
    }

    add(obj) {
        return fetch(
            this.path,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),
                credentials: "include"
            }
        ).then(response => response.json())
    }

    update(id, obj) {
        return fetch(
            this.path + '/' + id,
            {
                method: 'UPDATE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),
                credentials: "include"
            }
        ).then(response => response.json())
    }

    remove(id) {
        return fetch(
            this.path + '/' + id,
            {
                method: 'DELETE',
                credentials: "include"
            }
        ).then(response => response.json())
    }
}