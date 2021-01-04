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
      getExt(req)
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
    const {img_path, ...body} = req.body
    if (body.img_type) {
      const img_type = getExt(req)
      body.img_path = '/img/user/' + req.username + img_type
    }
    
    const updated = await User.findByIdAndUpdate(
      req.id,
      body,
      {
        new: true,
        runValidators: true,
      }
    )

    if (body.img_type) {
      if (process.env.NODE_ENV === 'development'){
        var fsRes = await import('http').then(({get}) => dropImg(get, process.env.DEV_CODESHIP_FS_HOSTNAME, body.img_path))
      } else {
        var fsRes = await import('https').then(({get}) => dropImg(get, process.env.CODESHP_FS_HOSTNAME, body.img_path))
      }
    }
    res.status(200).json({
      user: updated,
      fsRes
    })

  } catch (err) {
    res.status(400).json({
      err: err.message
    })
  }

  function dropImg(get, hostname, img_path) {
    const options = {
      hostname,
      port: process.env.CODESHIP_FS_PORT,
      path: '/',
      method: 'DELETE',
      headers: {'x-access-token': process.env.SECRET, img_path}
    }
    return new Promise((resolve, reject) => get(options, request => {
      let response = ''
      request.on('data', data => response += data)
      request.on('end', () => {
        const resObj = JSON.parse(response)
        resolve(resObj)
      })
      request.on('error', err => reject(err))
    }))
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

/**
 * set extention as string ".[ext]" to req.body.img_type
 * @param {express.req} req 
 */
function getExt(req) {
  switch (req.body.img_type) {
    case 'image/gif':
      return '.gif'
    case 'image/jpeg':
      return '.jpeg'
    case 'image/png':
      return '.png'
      default :
      return '.null'
  }
}