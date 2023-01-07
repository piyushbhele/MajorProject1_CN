const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');

router.get('/posts', passport.checkAuthentication, postsController.posts);
router.post('/create-post', postsController.create);
module.exports = router;