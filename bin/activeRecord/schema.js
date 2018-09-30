// require all schema objects from schema folder
// store them by file name in an object
const Inflector = require('inflector-js');
const schemaPath = require('path').resolve(__dirname, "..", "..", "schema");
const schema = {};

require("fs").readdirSync(schemaPath).forEach(file => {
  name = Inflector.pluralize(file.split('.js')[0]);
  schema[name] = require(`../../schema/${file}`);
});

module.exports = schema;
