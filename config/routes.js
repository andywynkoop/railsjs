module.exports = function(router) {
  // define routes here
  // all route strings will be automatically prefixed with '/api'
  router.get('/users/likedPosts', UsersController, "likedPosts");
  // router.get('/posts/likers', PostsController, "likers");
};