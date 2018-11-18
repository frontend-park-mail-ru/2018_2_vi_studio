import Model from "./Model.js";

class UserModel extends Model {
    constructor() {
        super();
        this.path += '/user';

        this.get = this.getAll;
        this.getAll = undefined;
        this.remove = undefined;
    }
}

export default new UserModel();