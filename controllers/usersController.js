class UsersController extends ApplicationController {
  constructor(props) {
    super(props);
  }

  async create() {
    let user = new User(this.params);
    if (await user.save()) {
      this.render(user);
    } else {
      this.render(user.errors);
    }
  }

  async show() {
    let user = await User.find(this.params.id);
    const cat = await user.cat();
    console.log(cat.attributes);
    this.render(user);
  }

  async index() {
    let users = await User.all();
    this.render(users);
  }
}

module.exports = UsersController;