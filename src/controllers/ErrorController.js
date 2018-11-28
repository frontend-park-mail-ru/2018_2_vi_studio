import Controller from './Controller.js';
import ErrorView from "../components/ErrorView/ErrorView.js";

export default class GameController extends Controller {
    constructor() {
        super(ErrorView);
    }

    handle(args = []) {
    }
}