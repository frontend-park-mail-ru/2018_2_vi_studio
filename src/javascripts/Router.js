export default class Router {
    constructor(root) {
        this.routes = [];

        this.root = root;
        this.controllers = new Map();
    }

    /**
     * @param {string} pattern
     * @param {Controller} Controller
     */
    register(pattern, Controller) {
        this.routes.push({
            Controller: Controller,
            pattern: new RegExp('^' + pattern.replace(/:\w+/, '(\\w+)') + '$')
        });

        return this;
    }

    /**
     * @param {string} path
     */
    open(path) {
        const routes = this.routes.filter(route => route.pattern.test(path));

        if (routes.length === 0) {
            if (path === '/') {
                throw new Error('There must be a default router');
            }

            this.open('/');
        }

        const route = routes[0];

        const args = path.match(route.pattern);

        if (window.location.pathname !== path) {
            window.history.pushState(null, '', path);
        }

        let controller;

        if (this.controllers.has(route.Controller)) {
            controller = this.controllers.get(route.Controller);
        } else {
            controller = new route.Controller(this);
            this.root.appendChild(controller.element);
            this.controllers.set(route.Controller, controller);
        }

        for (let [, c] of this.controllers) {
            c.element.classList.add('hidden')
        }
        controller.element.classList.remove('hidden');

        controller.handle(args.slice(1));
    }

    start() {
        this.root.addEventListener('click', event => {
            if (!(event.target instanceof HTMLAnchorElement)) {
                return;
            }

            event.preventDefault();
            const link = event.target;

            this.open(link.pathname);
        });

        window.addEventListener('popstate', () => {
            const currentPath = window.location.pathname;

            this.open(currentPath);
        });

        const currentPath = window.location.pathname;
        this.open(currentPath);
    }
}