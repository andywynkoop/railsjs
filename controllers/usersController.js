const ApplicationController = require('./applicationController');

class UsersController extends ApplicationController {
  constructor(props) {
    super(props);
  }

  create() {
    const user = new User()
  }
}

module.exports = UsersController;