const mongoose = require('mongoose');
const validator = require('validator');
var bcrypt = require('bcryptjs');
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
    validate: {
      // this only works on CREATE SAVE!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password are not the same',
    },
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
    default: 0,
  },
});
// middleware hook
userSchema.pre('save', async function (next) {
  // only run this function if passowrd was actually modified otherwise quit with calling return next()
  if (!this.isModified('password')) return next();
  // Hash the password with cose 12
  this.password = await bcrypt.hash(this.password, 12);
  // delete the confirmPassword field
  this.passwrodConfirm = undefined;
  next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;
