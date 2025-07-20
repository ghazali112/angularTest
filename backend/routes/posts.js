const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middlewares/auth');

router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.post('/', auth, postController.createPost);

module.exports = router;
