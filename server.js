const mongoose = require('mongoose')
const express = require('express')
const route = express()
const app = require('./app')
require('dotenv').config()

const cors = require('cors')
require('dotenv').config()
route.use(cors({ 
  origin: process.env.ALLOWED_URLS.split(','),
  methods:['POST', 'PUT', 'GET', 'PATCH', 'DELETE']
}))

let DB = process.env.DATABASE_LOCAL
if( process.env.NODE_ENV === 'production' ){
  DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  )
}
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('connection successfull'))
  .catch((err) => console.log(err.message))
const PORT = process.env.PORT || 5000
route.use('/', app)
route.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})