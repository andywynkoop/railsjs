module.exports = function(router) {
  const controllersPath = require('path').resolve(__dirname, "..", "controllers");
  require("fs").readdirSync(controllersPath).forEach(file => {
    name = file.split('').map((el, idx) => (idx === 0) ? el.toUpperCase() : el).join('').split('.js')[0];
    this[name] = require(`../controllers/${file}`);
  });

  // define routes here
  // all route strings will be automatically prefixed with '/api'
  router.get("/cats", CatsController, "index");
  router.get("/cats/:id", CatsController, "show");
  router.get('/dogs', DogsController, "index");
  router.get('/dogs/:id', DogsController, "show");
  router.get('/dogs/:dogId/treats', TreatsController, "index");
  router.post('/cats', CatsController, "create");
};