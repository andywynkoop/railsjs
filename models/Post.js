class Post extends ModelBase {
  constructor(props) {
    super(props);
  }
}

Post.hasMany('likers', {
  foreignKey: 'likerIds',
  array: true,
  className: 'User'
});

module.exports = Post;