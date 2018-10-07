class AssociationOptions {
  constructor() {
    this.primaryKey = "_id";
  }

  // overwrite existing defaults with provided options
  use(options) {
    this.each(options, (k, v) => this[k] = v);
  }

  // easier iterator
  each(options, cb) {
    Object.keys(options).forEach(option => cb(option, options[option]));
  }
}

module.exports = AssociationOptions;