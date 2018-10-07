const express = require('express');
const app = express();
const path = require('path');
const root = path.resolve(__dirname, "../dist", "index.html");
app.use(express.static('dist'));
app.use(require('cookie-parser')());
app.use(require('body-parser').json());
const Router = require('./lib/router.js');
const { namespace } = require('../config/router.config');

//Make ModelBase, ControllerBase, ApplicationController globally available
require('./activeRecord/ModelBase.js');
require('./lib/models');
require('./lib/controllerBase');
require('./lib/controllers');
require('./lib/applicationController');


app.all(`${namespace}/*`, (req, res) => {
  const router = new Router(req, res);
  require('../config/routes')(router);
  router.run(req, res)
});

app.get('*', (_req, res) => {
  res.sendFile(root);
});

const port = process.env.port || 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});