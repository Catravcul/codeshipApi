const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    maxLength: [10, 'A username should not be longer than 10 characters.'],
    minLength: [4, 'A username should not be less than 4 characters.'],
    unique: true,
    require: [true, 'A user should have a unique username.'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 6,
  },
  passwrodConfirm: {
    type: String,
    required: [true, 'Please Confirm your password'],
    minLength: 6,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
  },
  points: {
    type: Number,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
