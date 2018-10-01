const Inflector = require('inflector-js');
const AssociationOptions = require('./associationOptions');

class HasManyOptions extends AssociationOptions {
  constructor(name, ownName, options) {
    super(options);
    this.foreignKey = `${ownName}Id`;
    this.className = Inflector.singularize(Inflector.capitalize(name));
  }
}

module.exports = HasManyOptions;