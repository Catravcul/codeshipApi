const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const signToken = (id) => {
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

exports.index = async (req, res, next) => {
  try {
    const users = await User.find()

    res.status(201).json({
      status: 'success',
      data: {
        users: users,
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err.message,
    })
  }
}

exports.signup = async (req, res, next) => {
  try {
    let newUser
    if(req.files) {
      const img_path = 'img/user/' + Date.now() + req.files.img.name
      req.body.img_path = img_path
      newUser = await User.create(req.body)
      req.files.img.mv('public/' + img_path, err => console.log(err))
    }else {
      req.body.img_path = 'img/user/profile.jpg'
      newUser = await User.create(req.body)
    }
    const token = signToken(newUser._id)

    res.status(201).json({
      status: 'success',
      data: {
        token: token,
        user: newUser
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err.message,
    })
  }
}

exports.login = async (req, res, next) => {
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
      status: 'success',
      data: {
        token: token
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}

exports.show = async (req, res, next) => {
  try{
    const user = await User.findOne({username: req.params.id})
    res.status(200).json({
      status: 'OK',
      data: {
        user: user
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    })
  }
}

exports.drop = async (req, res, next) => {
  try{
    const result = await User.remove({}, err => {
      return err
    })
    res.status(200).json({
      status: 'OK',
      data: {
        result: result
      }
    })
  } catch(err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    })
  }
}

exports.update = async (req, res, next) => {
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
      status: 'OK',
      data: {
        user: updated
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    })
  }
}