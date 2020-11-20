const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const signToken = (id) => {
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      data: {
        token,
        user: newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //   1) Checkif email and email exists
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Your email and password do not match',
      });
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect email or password',
      });
    }
    // 3) If everything is correct ,send token to client
    // const token = signToken (user._id)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
    return res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: err.message,
    });
  }
};
