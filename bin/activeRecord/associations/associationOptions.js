class AssociationOptions {
  constructor(options) {
    this.primaryKey = "_id";
    this.each(options, (k, v) => this[k] = v);
  }

  each(options, cb) {
    Object.keys(options).forEach(option => cb(option, options[option]));
  }
}

module.exports = AssociationOptions;