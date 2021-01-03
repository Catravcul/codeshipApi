const express = require('express')
const morgan = require('morgan')
const express_fileupload = require('express-fileupload')
const {userRoute, userPublicRoute} = require('./routes/userRoute')
const {productRoute, productPublicRoute} = require('./routes/productRoute')
const {spaceshipRoute, spaceshipPublicRoute} = require('./routes/spaceshipRoute')
const {userProductRoute, userProductPublicRoute} = require('./routes/userProductRoute')
const {commentRoute, commentPublicRoute} = require('./routes/commentRoute')
const {serverRoute, serverPublicRoute} = require('./routes/serverRoute')
const jwt = require('jsonwebtoken')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express_fileupload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

app.use(express.static(`${__dirname}/public`))

//Validate token from req.body param and saves user id inside of it as req.body.serverId
app.use((req, res, next) => {
  try{
    if(req.body.token){
      const token = req.body.token
      req.body.serverId = jwt.verify(token, process.env.JWT_SECRET).id
      next()
    } else {
      next()
    }
  } catch (err) {
    res.status(300).json({
      status: 'fail',
      message: err.message,
    })
  }
})

app.use('/server', serverPublicRoute)
app.use('/public/user', userPublicRoute)
app.use('/public/product', productPublicRoute)
app.use('/public/comment', commentPublicRoute)
app.use('/public/spaceship', spaceshipPublicRoute)
app.use('/public/user_product', userProductPublicRoute)

//Validates token, saves user data inside of it in req parameter
app.use((req, res, next) => {
  try {
    const token = req.header('x-access-token')
    const {id, img_path, username} = jwt.verify(token, process.env.JWT_SECRET)
    if (id) {
      req.id = id,
      req.img_path = img_path
      req.username = username
      next()
    } else {
      res.status(300).json({
        status: 'fail',
        message: 'a token is required',
      })
    }
  } catch (err) {
    res.status(300).json({
      status: 'fail',
      message: err.message,
    })
  }
})


app.use('/product', productRoute)
app.use('/user', userRoute)
app.use('/spaceship', spaceshipRoute)
app.use('/user_product', userProductRoute)
app.use('/comment', commentRoute)

//Gets user data inside token
app.get('/token/img_path', (req, res) => {
  res.status(200).json({img_path: req.img_path})
})

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Cant find ${req.originalUrl} on the server, ${__dirname}`,
  })
  next()
})
module.exports = app