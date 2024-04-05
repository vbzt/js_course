const Post = require('../models/Post');
const User = require('../models/User');

class PostController {
  static async showPosts(req, res) {
    res.render('posts/home');
  }
}

module.exports = PostController;
