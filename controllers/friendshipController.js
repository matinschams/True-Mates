const { Friendship, User, Sequelize } = require('../models');

module.exports = {
  addFriend: async (req, res, next) => {
    try {
      const { friendId } = req.body;
      const userId = req.user.id;

      if (userId === friendId) {
        return res
          .status(400)
          .json({ error: 'You cannot add yourself as a friend' });
      }

      const existingFriendship = await Friendship.findOne({
        where: {
          userId,
          friendId,
        },
      });

      if (existingFriendship) {
        return res.status(400).json({ error: 'Friendship already exists' });
      }

      await Friendship.create({ userId, friendId });
      await Friendship.create({ userId: friendId, friendId: userId });

      res.status(201).json({ message: 'Friend added successfully' });
    } catch (error) {
      console.error('Error in addFriend:', error);
      return next({
        log: `Error found in friendshipController.addFriend ${error}`,
        status: 500,
        message: { err: 'An error occurred' },
      });
    }
  },
};
