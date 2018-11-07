export default class Router {
    constructor(root) {
        this.routes = [];

        this.root = root;
        this.views = new Map();
    }

    /**
     * @param {string} pattern
     * @param {View} View
     */
    register(pattern, View) {
        this.routes.push({
            View: View,
            // view: null,
            pattern: new RegExp('^' + pattern.replace(/:\w+/, '(\\w+)') + '$')
        });

        return this;
    }

    /**
     * @param {string} path
     */
    open(path) {
        // cannot use forEach

        for (let i = 0; i < this.routes.length; i++) {
            const route = this.routes[i];
            const args = path.match(route.pattern);

            if (!args) {
                continue;
            }

            if (window.location.pathname !== path) {
                window.history.pushState(null, '', path);
            }

            let view;

            if (this.views.has(route.View)) {
                view = this.views.get(route.View);
            } else {
                const el = document.createElement('section');
                this.root.appendChild(el);
                view = new route.View(el, this);
                this.views.set(route.View, view);
            }


            if (!view.active) {
                for (let [_, v] of this.views) {
                    if (v.active) {
                        v.hide();
                    }
                }
                view.show();
            }

            this.routes[i] = route;

            view.handle(args.slice(1));

            return;
        }

        this.open('/');
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