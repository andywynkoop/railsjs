const { BelongsToOptions, HasManyOptions } = require('./associations');

module.exports = {
  belongsTo(name, assocOptions = {}) {
    const options = new BelongsToOptions(name, assocOptions);
    // define a function on the prototype to call the association
    this.prototype[name] = async function() {
      // fetch foreign key value using getter function
      let foreignKeyValue = this[options.foreignKey]();
      // eval className to get constructor function
      let className = eval(options.className);
      // find an instance of the provided class by the foreign key
      const instance = await className.find(foreignKeyValue);
      return instance;
    }
  },

  hasMany(name, assocOptions = {}) {
    const options = new HasManyOptions(name, this.name, assocOptions);
    this.prototype[name] = async function() {
      let className = eval(options.className);
      let { primaryKey, foreignKey } = options;
      // if 'array' is set to 'true', assume that the has many relationship is many-to-many
      // define params to be used with 'where' to find a collection of instances
      let params;
      if (options.array) {
        // if many-to-many, fetch array of foreign keys using defined getter function;
        // query the db looking for inclusion of the primary key in the specified array
        // for instance, assuming defaults, the query would look for instances of the class with _ids included 
        // in the array
        let foreignKeyValue = this[foreignKey]();
        params = { [primaryKey]: { $in: foreignKeyValue } }
      } else {
        // if one-to-many, look for a foreign key on the target collection equal to the value of 'this''s primary key
        let primaryKeyValue = this[primaryKey]();
        params = { [foreignKey]: primaryKeyValue };
      }
      const instances = await className.where(params);
      return instances;
    }
  }
}