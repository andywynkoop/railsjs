const ApplicationController = require('./applicationController');

class DogsController extends ApplicationController {
  constructor(props) {
    super(props);
  }


  index() {
    let dogs = [1, 2, 3, 4, 5].map(id => this.dogFactory(id));
    this.render(dogs);
  }

  show() {
    this.render(this.dogFactory(this.params.id));
  }
}

module.exports = DogsController;