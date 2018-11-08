import Model from "./Model.js";

class SessionModel extends Model {
    constructor() {
        super();
        this.path += '/session';

        this.get = undefined;
        this.getAll = undefined;
        this.update = undefined;
    }

    remove() {
        return fetch(
            this.path,
            {
                method: 'DELETE',
                credentials: "include"
            }
        )
    }
}

export default new SessionModel();