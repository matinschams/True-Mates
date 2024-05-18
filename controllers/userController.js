const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      res.status(201).json(user);
    } catch (error) {
      return next({
        log: `Error found in userController.register ${error}`,
        status: 500,
        message: { err: 'An error occurred' },
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'Cannot find user' });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.status(200).json({ token });
    } catch (error) {
      return next({
        log: `Error found in userController.login ${error}`,
        status: 500,
        message: { err: 'An error occurred' },
      });
    }
  },
};
