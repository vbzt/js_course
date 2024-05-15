const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const checkAuth = require('../helpers/auth').checkAuth

router.get('/profile', checkAuth, PostController.profile)
router.get('/create', checkAuth, PostController.createPost)
router.get('/', PostController.showPosts);

router.post('/create', checkAuth, PostController.registerPost)

module.exports = router;
