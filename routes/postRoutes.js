const express = require('express');
const postController = require('../controllers/postController');
const { auth } = require('../middlewares/auth');
const router = express.Router();

router.post('/', auth, postController.createPost);
router.put('/:id', auth, postController.editPost);
router.get('/', auth, postController.getPosts);

module.exports = router;
