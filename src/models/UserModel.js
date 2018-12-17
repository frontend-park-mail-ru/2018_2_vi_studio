import Model from "./Model.js";

class UserModel extends Model {
    constructor() {
        super();
        this.path += '/user';

        this.get = this.getAll;
        this.getAll = undefined;
        this.remove = undefined;
    }
    update(obj) {
        return fetch(
            this.path,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),
                credentials: "include"
            }
        ).then(response => response.json());
    }

    addAvatar(file) {
        return fetch(
            this.path + '/avatar',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: file,
                credentials: "include"
            }
        ).then(response => response.json());
    }
}

export default new UserModel();