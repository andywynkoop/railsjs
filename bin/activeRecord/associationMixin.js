const { BelongsToOptions, HasManyOptions } = require('./associations');

module.exports = {
  belongsTo(name, assocOptions = {}) {
    const options = new BelongsToOptions(name, assocOptions);
    this.prototype[name] = async function() {
      let foreignKeyValue = this[options.foreignKey]();
      let className = eval(options.className);
      const instance = await className.find(foreignKeyValue);
      return instance;
    }
  },

  hasMany(name, assocOptions = {}) {
    const options = new HasManyOptions(name, this.name, assocOptions);
    this.prototype[name] = async function() {
      let className = eval(options.className);
      let foreignKeyName = options.foreignKey;
      let primaryKeyValue = this[options.primaryKey]();
      let params = { [foreignKeyName]: primaryKeyValue };
      console.log("!!!!", params)
      const instances = await className.where();
      return instances;
    }
  }
}