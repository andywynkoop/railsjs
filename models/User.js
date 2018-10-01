class User extends ModelBase {
  constructor(props) {
    super(props);
  }
}

User.belongsTo("cat");

module.exports = User;