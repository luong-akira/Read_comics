const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = user.generateToken();
    res.header('x-auth-token', token).send(token);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/login', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
