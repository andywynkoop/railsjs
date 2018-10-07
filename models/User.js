class User extends ModelBase {
  constructor(props) {
    super(props);
  }
}

User.hasMany('likedPosts', {
  foreignKey: "postIds",
  array: true,
  className: 'Post'
});

module.exports = User;