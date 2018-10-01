module.exports = function(router) {
  // define routes here
  // all route strings will be automatically prefixed with '/api'
  router.get('/firstcat', CatsController, "first");
  router.get("/cats", CatsController, "index");
  router.get("/cats/:id", CatsController, "show");
  router.post('/cats', CatsController, "create");
  router.delete('/cats/:id', CatsController, "delete");
  router.post('/users', UsersController, "create");
  router.get("/users/:id", UsersController, "show");
  router.get('/users', UsersController, "index");
};