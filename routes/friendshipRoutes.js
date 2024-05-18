const express = require('express');
const friendshipController = require('../controllers/friendshipController');
const { auth } = require('../middlewares/auth');
const router = express.Router();

router.post('/add', auth, friendshipController.addFriend);
router.get('/list', auth, friendshipController.getFriends);

module.exports = router;
