const express = require('express');
const {
  addFriend,
  getFriends,
} = require('../controllers/friendshipController');
const { auth } = require('../middlewares/auth');
const router = express.Router();

router.post('/add', auth, addFriend);

module.exports = router;
