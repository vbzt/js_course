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

  static async removePost(req, res) {
    const userId = req.session.userid;
    const postId = req.body.id;

    const user = await User.findOne({ where: {id: userId }, include: Post, plain: true });

    if(!user) {
        res.redirect('/login');
        return;
    }

    try {
        await Post.destroy({ where: { id: postId, UserId: userId } });

        res.redirect('/profile');
    } catch(err) {
        console.log(`>> remove post error: ${err}`);
    }
}

  static async editPost(req, res){
    const userId = req.session.userid
    const postId = req.params.id

    Post.findOne({ where: { id: postId }, raw: true })
    .then((post) => {
        const ownerId = post.UserId;
        if(userId !== ownerId) {
            res.redirect('/posts/dashboard');

            return;
        }
        res.render('posts/edit', { post })
    })
    .catch((err) => console.log(`>> edit error: ${err}`))
  }

  static async saveEdit(req, res) {
    const postId = req.body.id;

    const post = {
        title: req.body.post
    }

    Post.update(post, { where: { id: postId } })
        .then(() => {
            req.session.save(() => {
                res.redirect('/profile')
            })
        })
        .catch((err) => console.log(`>> update error: ${err}`));
}

}

module.exports = PostController;
