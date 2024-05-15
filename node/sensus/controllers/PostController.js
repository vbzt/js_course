const Post = require('../models/Post');
const User = require('../models/User');

class PostController {
  static async showPosts(req, res) {
    res.render('posts/home');
  }

  static async profile(req, res){ 
    const userid = req.session.userid

    const user = await User.findOne({where: {id: userid}, include: Post, plain: true})

    if(!user){ res.redirect('/login') }

    const userPosts = user.Posts.map((result) => result.dataValues)

    res.render('posts/profile', {posts: userPosts})
  }

  static async createPost(req, res){
    res.render('posts/create')
  }

  static async registerPost(req, res){
    const post = {
      title: req.body.post,
      UserId: req.session.userid
    }

    try{
      await Post.create(post)

      req.flash('message', 'Post registered succesfully')

      req.session.save(() => {
        res.redirect('/profile')
      })
    }catch(e){
      console.log(e)
    }
  }
}

module.exports = PostController;
