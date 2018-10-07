class UsersController extends ApplicationController {
  constructor(props) {
    super(props);
  }

  async likedPosts() {
    let user = new User({name: "Andy"});
    let post = new Post({ title: "Test" });
    post = await post.save();
    user.postIds([]);
    user.attributes.postIds.push(post._id());
    user = await user.save();
    let likedPosts = await user.likedPosts();
    this.render({
      user: user.attributes,
      likedPosts: likedPosts.map(post => post.attributes)
    });
  }
}

module.exports = UsersController;