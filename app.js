const express = require('express');
const morgan = require('morgan');
var cors = require('cors');
const app = express();
const userRoute = require('./routes/userRoute');
console.log(userRoute);

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`));
app.use(cors({ origin: 'http://localhost:5000' }));
app.use((req, res, next) => {
  console.log('hello from middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use('/user',userRoute);
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Cant find ${req.originalUrl} on the server`,
  });
  next();
});
module.exports = app;
