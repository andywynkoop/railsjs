const ApplicationController = require('./applicationController');

class CatsController extends ApplicationController {
  constructor(props) {
    super(props);
  }

  async create() {
    let cat = new this.Cat({
      name: "Andy"
    });
    if (await cat.save()) {
      this.render(cat);
    } else {
      this.render(cat.errors);
    }
  }

  async index() {
    const { Cat } = this;
    let cats = await Cat.all();
    this.render(cats);
  }

  async show() {
    let cat = await this.Cat.find(this.params.id);
    this.render(cat);
  }
}

module.exports = CatsController;