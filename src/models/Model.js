import {SERVER_API_PATH} from "../constants.js"

export default class Model {
    constructor() {
        this.path = SERVER_API_PATH;
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
                method: 'PUT',
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