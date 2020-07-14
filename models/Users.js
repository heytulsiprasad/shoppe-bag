const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Items Schema
const ItemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create Users Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  items: [ItemSchema],
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
