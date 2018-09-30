const Route = require('./route');
const url = require('url');

class Router {
  constructor() {
    this.routes = [];
    this.addRoute = this.addRoute.bind(this);
    this.match = this.match.bind(this);
  }

  addRoute(httpVerb, pattern, controller, action) {
    pattern = this.appendApi(this.chomp(pattern));
    const route = new Route(httpVerb, pattern, controller, action);
    this.routes.push(route);
  }

  match(req, res) {
    for(let i = 0; i < this.routes.length; i++) {
      let route = this.routes[i];
      if (route.matches(req)) return route;
    }
    res.status(404).send(`No Route Matches ${req.method} ${url.parse(req.url).pathname}`)
  }

  run(req, res) {
    const route = this.match(req, res);
    if (!route) return console.log("No route found.")
    route.run(req, res, {});
  }

  chomp(pattern) {
    if (pattern.slice(-1) === '/') return pattern.slice(0, -1);
    return pattern;
  }

  appendApi(pattern) {
    return "/api" + pattern;
  }
}


["get", "post", "patch", "delete"].forEach(verb => {
  let fn = function(...params) {
    this.addRoute(verb, ...params);
  }
  Object.defineProperty(fn, "name", {
    value: verb,
    writable: false
  });
  Router.prototype[verb] = fn;
});


module.exports = Router;