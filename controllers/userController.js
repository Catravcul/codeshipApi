const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const getToken = (user) => {
  jwt.sign({ user }, process.env.JWT_SECRET, {
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
    let newUser
    req.body.img_path = 'img/user/' + req.body.username
    newUser = await User.create(req.body)

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
    // const token = signToken (user._id)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      })
    return res.status(200).json({
      token: token,
      user: user
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
  try{
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
    const token = req.header('x-access-token')
    const id = req.params.id || jwt.verify(token, process.env.JWT_SECRET).id
    const updated = await User.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
    
    if(req.files) {
      let img_path = updated.img_path
      if(img_path = 'public/user/profile.jpg'){
        img_path = 'img/user/' + Date.now() + req.files.img.name
      }
      await User.findByIdAndUpdate(
        req.params.id,
        {img_path: img_path}
      )
      updated.img_path = img_path
      req.files.img.mv('public/' + img_path, err => console.log(err))
    }

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