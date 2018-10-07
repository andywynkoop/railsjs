const name = require('path').resolve(__dirname, '../../').split('/').slice(-1)[0];

class Session {
  constructor(req) {
    const cookie = req.cookies[name];
    if (cookie) {
      this.cookie = JSON.parse(cookie);
    } else {
      this.cookie = {};
    }
  }

  get(key) {
    return this.cookie[key];
  }

  set(key, val) {
    return this.cookie[key] = val;
  }

  save(res) {
    return res.cookie(name, JSON.stringify(this.cookie));
  }
}

module.exports = Session;