export class Router {
    routes;
    get;
    post;
    constructor() {
        this.routes = [];
        this.get = this.add.bind(this, 'GET');
        this.post = this.add.bind(this, 'POST');
    }
    add(method = 'GET', pathname = '', handler) {
        this.routes.push({
            method,
            pattern: pathname,
            handler,
        });
    }
    async handler(req) {
        let res;
        const url = new URL(req.url);
        for (const route of this.routes) {
            if (route.method === req.method) {
                const match = this.matchRoute(route.pattern, url.pathname);
                if (match) {
                    res = await route.handler(req, match.params);
                    if (res)
                        return res;
                }
            }
        }
        return new Response('404', { status: 404 });
    }
    matchRoute(pattern, pathname) {
        if (pattern === '*') {
            return { params: {} };
        }
        // Convert pattern like "/:id" to regex
        const regexPattern = pattern
            .replace(/:[^/]+/g, '([^/]+)')
            .replace(/\*/g, '.*');
        const regex = new RegExp(`^${regexPattern}$`);
        const match = pathname.match(regex);
        if (!match)
            return null;
        // Extract parameter names from pattern
        const paramNames = pattern.match(/:[^/]+/g)?.map(p => p.slice(1)) || [];
        const params = {};
        paramNames.forEach((name, index) => {
            params[name] = match[index + 1];
        });
        return { params };
    }
}
