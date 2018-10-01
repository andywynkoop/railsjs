const Inflector = require('inflector-js');
const AssociationOptions = require('./associationOptions');

class BelongsToOptions extends AssociationOptions {
  constructor(name, options) {
    super(options);
    this.foreignKey = `${name}Id`;
    this.className = Inflector.capitalize(name);
  }
}

module.exports = BelongsToOptions;