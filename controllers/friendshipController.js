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
        where: { userId, friendId },
      });

      if (existingFriendship) {
        return res.status(400).json({ error: 'Friendship already exists' });
      }

      await Friendship.create({ userId, friendId });
      await Friendship.create({ userId: friendId, friendId: userId });

      res.status(201).json({ message: 'Friend added successfully' });
    } catch (error) {
      return next({
        log: `Error found in friendshipController.addFriend ${error}`,
        status: 500,
        message: { err: 'An error occurred' },
      });
    }
  },

  getFriends: async (req, res, next) => {
    try {
      const userId = req.user.id;

      const friends = await Friendship.findAll({
        where: { userId },
        include: [
          {
            model: User,
            as: 'Friend',
            attributes: ['id', 'name', 'email'],
          },
        ],
      });

      const friendsList = await Promise.all(
        friends.map(async f => {
          if (!f.Friend) {
            return null;
          }

          const mutualFriendsCount = await Friendship.count({
            where: {
              userId: f.friendId,
              friendId: { [Sequelize.Op.in]: friends.map(f => f.friendId) },
            },
          });

          return {
            id: f.Friend.id,
            name: f.Friend.name,
            email: f.Friend.email,
            mutualFriendsCount,
          };
        }),
      );

      const validFriendsList = friendsList.filter(f => f !== null);

      res.json(validFriendsList);
    } catch (error) {
      return next({
        log: `Error found in friendshipController.getFriends ${error}`,
        status: 500,
        message: { err: 'An error occurred' },
      });
    }
  },
};
