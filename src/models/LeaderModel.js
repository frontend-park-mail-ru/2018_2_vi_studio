import Model from "./Model.js";

class LeaderModel extends Model {
    constructor() {
        super();
        this.path += '/leader';

        this.get = undefined;
        this.add = undefined;
        this.update = undefined;
        this.remove = undefined;
    }

    getAll(page = 1) {
        return fetch(
            this.path + `?page=${page}`,
            {credentials: "include"}
        ).then(response => response.json())
    }
}

export default new LeaderModel();