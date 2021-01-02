const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const getToken = (user) => {
  const {id, img_path, username} = user
  return jwt.sign({ id, img_path, username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

exports.index = async (req, res) => {
  try {
    const users = await User.find()

    res.status(201).json({
      users: users
    })
  } catch (err) {
    res.status(404).json({
      err: err.message
    })
  }
}

exports.signup = async (req, res) => {
  try {

    if (req.body.img_type) {
      switch (req.body.img_type) {
        case 'image/gif':
          req.body.img_type = '.gif'
          break
        case 'image/jpeg':
          req.body.img_type = '.jpeg'
          break
        case 'image/png':
          req.body.img_type = '.png'
          break
          default :
          req.body.img_type = '.null'
      }
      req.body.img_path = '/img/user/' + req.body.username + req.body.img_type
    }
    const newUser = await User.create(req.body)

    res.status(201).json({
      user: newUser
    })
  } catch (err) {
    res.status(404).json({
      err: err.message
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    //   1) Checkif username and username exists
    if (!username || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Your username and password do not match',
      })
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({username }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect username or password',
      })
    }
    // 3) If everything is correct ,send token to client
    return res.status(200).json({
      token: getToken(user),
      user
    })
  } catch (err) {
    res.status(400).json({
      err: err.message
    })
  }
}

exports.show = async (req, res) => {
  try{
    const user = await User.findById(req.params.id)
    res.status(200).json({
      user: user
    })
  } catch (err) {
    res.status(400).json({
      err: err.message
    })
  }
}

exports.drop = async (req, res) => {
  try {
    const result = await User.remove({}, err => {
      return err
    })
    res.status(200).json({
      result: result
    })
  } catch(err) {
    res.status(400).json({
      err: err.message
    })
  }
}

exports.update = async (req, res) => {
  try {
    if (req.body.img_type) {
      req.body.img_path = '/img/user/' + req.username + req.body.img_type
    }
    
    const updated = await User.findByIdAndUpdate(
      req.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
    
    res.status(200).json({
      user: updated
    })
  } catch (err) {
    res.status(400).json({
      err: err.message
    })
  }
}

exports.updateSession = async (req, res) => {
  try {
    const user = await User.findById(req.id)
    res.status(200).json({
      user: user
    })
  } catch (err) {
    res.status(400).json({
      err: err.message
    })
  }
}
