const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

module.exports = {
  auth: async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({ error: 'You need authorization' });
      }
      req.user = user;
      next();
    } catch (error) {
      return next({
        log: `Error found in middlewares/auth ${error}`,
        status: 500,
        message: { err: 'An error occurred' },
      });
    }
  },
};
