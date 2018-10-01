class Cat extends ModelBase {
  constructor(props) {
    super(props);
  }
}

Cat.hasMany("users");

module.exports = Cat;