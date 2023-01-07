const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts_controller');

router.get('/posts', postsController.posts);
router.post('/create-post', postsController.create);
module.exports = router;