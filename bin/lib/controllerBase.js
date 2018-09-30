const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Session = require('./session');
const Route = require('./route');
const Router = require('./router');
const schema = require('../activeRecord/schema');

class ControllerBase {
  constructor(props) {
    const { req, res, db, params } = props;
    this.req = req;
    this.res = res;
    this.db = db;
    this.params = params;
    this.alreadyBuiltResponse = false;

    this.checkResponse = this.checkResponse.bind(this);
    this.render = this.render.bind(this);
    this.session = new Session(this.req);

    //define all models
    const modelPath = require('path').resolve(__dirname, "..", "..", "models");
    require("fs").readdirSync(modelPath).forEach(file => {
      name = file.split('.js')[0];
      this[name] = require(`../../models/${file}`);
    });
  }

  // prevent double render
  checkResponse() {
    if (this.alreadyBuiltResponse) {
      res.status(500).send("Already built response");
    } 
    this.alreadyBuiltResponse = true;
  }

  // return a promise containing randomly generated bytes of a given size
  secureRandom(size = 16) {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(size, (err, buffer) => {
        if (err) reject(err);
        resolve(buffer.toString('hex'));
      });
    });
  } 

  // create a hash from password using bcrypt
  hash(password) {
    return bcrypt.hash(password, saltRounds);
  }

  // check a password against a hash using bcrypt
  compare(password, hash){
    return bcrypt.compare(password, hash);
  }

  invokeAction(actionName) {
    if (!this[actionName]) throw `undefined method ${actionName} for ${this.constructor.name}`
    this[actionName]();
  }

  render(content) {
    this.session.count();
    this.session.save(this.res);
    this.res.send(content);
  }
}

module.exports = ControllerBase;