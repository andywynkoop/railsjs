const ApplicationController = require('./applicationController');

class TreatsController extends ApplicationController {
  constructor(props) {
    super(props);
  }

  index() {
    const { dogId } = this.params;
    this.render({
      dogId,
      treats: [1, 2, 3, 4, 5]
    })
  }
}

module.exports = TreatsController;