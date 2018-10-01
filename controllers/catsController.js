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
    this.render(cat);
  }

  async delete() {
    const cat = await Cat.find(this.params.id);
    await cat.destroy();
    this.render("Success");
  }

  async destroyAll() {
    Cat.destroyAll();
    this.render("Destroyed all cats")
  }

  async first() {
    let cat = await Cat.first();
    this.render(cat);
  }

}

module.exports = CatsController;