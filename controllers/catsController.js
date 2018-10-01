class CatsController extends ApplicationController {
  constructor(props) {
    super(props);
  }

  async create() {
    let cat = new Cat(this.params);
    if (await cat.save()) {
      this.render(cat);
    } else {
      this.render(cat.errors);
    }
  }

  async index() {
    let cats = await Cat.all();
    this.render(cats);
  }

  async show() {
    let cat = await Cat.find(this.params.id);
    let users = await cat.users();
    console.log(users[0].attributes);
    this.render(cat);
  }

  async delete() {
    const cat = await Cat.find(this.params.id);
    await cat.destroy();
    this.render("Success");
  }
}

module.exports = CatsController;