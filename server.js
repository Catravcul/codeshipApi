const mongoose = require('mongoose')
const app = require('./app')
require('dotenv').config()

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
app.listen(PORT, () => {
  console.log(`http://127.0.0.1:${PORT}`)
})