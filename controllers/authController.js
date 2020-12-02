const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const signToken = (id) => {
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = async (req, res, next) => {
  try {
    const img_path = 'public/img/user/' + Date.now() + req.files.img.name;
    req.body.img_path = img_path;
    const newUser = await User.create(req.body);
    req.files.img.mv(img_path, err => console.log(err));
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
    const { username, password } = req.body;
    //   1) Checkif username and username exists
    if (!username || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Your username and password do not match',
      });
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({username }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect username or password',
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
