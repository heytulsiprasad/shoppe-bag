const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/Users');

// @route POST api/auth
// @desc Auth user (Login)
// @access Public

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  //   Simple Validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  //   Check for existing user
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'User does not exisits' });

  // Validate password
  bcrypt.compare(password, user.password).then((isMatch) => {
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // If it does match we have to generate a JWT token (as while registering)

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
            items: user.items,
          },
        });
      }
    );
  });
});

// @route GET api/auth/user
// @desc Get user data
// @access Private

router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then((user) => res.json(user));
});

module.exports = router;
