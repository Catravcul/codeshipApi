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

    const {img_path, ...body} = req.body
    const newUser = await User.create(body)

    res.status(201).json({
      token: getToken(newUser),
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
        err: 'Your username and password do not match',
      })
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({username }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        err: 'Incorrect username or password',
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
    const {img_path, ...body} = req.body
    
    const updated = await User.findByIdAndUpdate(
      req.id,
      body,
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