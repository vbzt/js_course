const Post = require('../models/Post');
const User = require('../models/User');
const moment = require('moment');

class PostController {
  static async showPosts(req, res) {
    const postsData = await Post.findAll({
      include: User
    })

    const posts = postsData.map(result => {
      let post = result.get({ plain: true });
      post.createdAt = formatTimeAgo(post.createdAt);
      return post;
    });
    res.render('posts/home', {posts});
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

function formatTimeAgo(createdAt) {
  const createdDate = moment(createdAt);
  const now = moment();
  
  const seconds = now.diff(createdDate, 'seconds')
  const diffMinutes = now.diff(createdDate, 'minutes');
  const diffHours = now.diff(createdDate, 'hours');
  const diffDays = now.diff(createdDate, 'days');
 if(diffMinutes == 0){
  return `${seconds}s ago`;
 }
 if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  } 
  if (diffHours < 24) {
    return `${diffHours} hours ago`;
  }else{
    return `${diffDays} days ago`;
  }
}

module.exports = PostController;
