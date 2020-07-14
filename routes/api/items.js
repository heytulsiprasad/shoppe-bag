const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Users = require('../../models/Users');
const Item = require('../../models/Items');

// @route GET api/items
// @desc Get All Items
// @access Public

router.get('/', auth, (req, res) => {
  Users.findById(req.user.id, 'items')
    .sort({ date: -1 }) // descending order
    .then((items) => res.json(items.items));
});

// @route POST api/items
// @desc  Create an Item
// @access Post

router.post('/', auth, (req, res) => {
  Users.findByIdAndUpdate(
    req.user.id,
    {
      $push: { items: { title: req.body.title } },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .then((items) => res.json(items.items[items.items.length - 1]))
    .catch((err) => console.log(err));
});

// @route DELETE api/items/:id
// @desc  Delete A Item
// @access Private

router.delete('/:id', auth, (req, res) => {
  Users.findByIdAndUpdate(
    req.user.id,
    { $pull: { items: { _id: req.params.id } } },
    { new: true, useFindAndModify: false }
  )
    .then((items) => res.json(items.items))
    .catch((err) => console.log(err));
});

module.exports = router;
