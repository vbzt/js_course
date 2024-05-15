const Post = require('../models/Post');
const User = require('../models/User');

class PostController {
  static async showPosts(req, res) {
    res.render('posts/home');
  }

  static async profile(req, res){ 
    res.render('posts/profile')
  }

  static async createPost(req, res){
    res.render('posts/create')
  }
}

module.exports = PostController;
