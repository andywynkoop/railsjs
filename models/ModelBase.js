const NoSQLObject = require('../bin/activeRecord/noSqlObject');

class ModelBase extends NoSQLObject {
  constructor(props) {
    super(props);
  }
}

module.exports = ModelBase;