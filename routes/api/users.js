const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/Users');

// @route POST api/users
// @desc Register new user
// @access Public

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  //   Simple Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  //   Check for existing user
  const user = await User.findOne({ email });
  if (user) return res.status(400).json({ msg: 'User already exisits' });

  const newUser = new User({
    name,
    email,
    password,
  });

  // Create salt & hash
  bcrypt.genSalt(13, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) => {
        jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;

            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
              },
            });
          }
        );
      });
    });
  });
});

module.exports = router;
