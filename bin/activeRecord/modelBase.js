const NoSQLObject = require('./noSqlObject');
const QueryMixin = require('./queryMixin');
const AssociationMixin = require('./associationMixin');

class ModelBase extends NoSQLObject {
  constructor(props) {
    super(props);
  }
}

Object.assign(NoSQLObject, QueryMixin, AssociationMixin);

// globally define ModelBase
(0, eval)('this').ModelBase = ModelBase;

module.exports = ModelBase;