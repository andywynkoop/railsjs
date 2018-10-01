const url = require('url');
const UrlPattern = require('url-pattern');

class Route {
  constructor(httpMethod, pattern, controller, action) {
    this.pattern = this.chomp(pattern);
    this.httpMethod = httpMethod.toUpperCase();
    this.controller = controller;
    this.action = action;
  }

  parse(req) {
    return url.parse(req.url);
  }

  matches(req) {
    const { pathname } = this.parse(req);
    const { method } = req;
    const pattern = new UrlPattern(this.pattern);
    const match = pattern.match(this.chomp(pathname));
    this.routeParams = match || {};
    return !!match && method === this.httpMethod;
  }

  run(req, res, params) {
    params = Object.assign({}, params, req.body, this.routeParams);
    new this.controller({req, res, params}).invokeAction(this.action);
  }

  chomp(pattern) {
    if (pattern.slice(-1) === '/') return pattern.slice(0, -1);
    return pattern;
  }
}

module.exports = Route;