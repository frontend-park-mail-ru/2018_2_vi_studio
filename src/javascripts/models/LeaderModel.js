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

    getAll(limit = 10, offset = 0) {
        return fetch(
            this.path + `?limit=${limit}&${offset}`,
            {credentials: "include"}
        ).then(response => response.json())
    }
}

export default new LeaderModel();