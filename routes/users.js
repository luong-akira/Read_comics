const express = require('express');
const router = express.Router();
const { User, registerValidation } = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  try {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ msg: 'User has already register' });
    }
    user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
    const result = await user.save();

    const token = user.generateToken();
    res.header('x-auth-token', token).send(token);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
