const Inflector = require('inflector-js');
const AssociationOptions = require('./associationOptions');

class BelongsToOptions extends AssociationOptions {
  constructor(name, options) {
    this.foreignKey = `${name}Id`;
    this.className = Inflector.capitalize(name);
    // overwrite defaults last
    this.use(options);
  }
}

module.exports = BelongsToOptions;