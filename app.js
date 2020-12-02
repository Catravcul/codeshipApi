const express = require('express');
const morgan = require('morgan');
var cors = require('cors');
const express_fileupload = require('express-fileupload')
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const spaceshipRoute = require('./routes/spaceshipRoute');
const userProductRoute = require('./routes/userProductRoute');
const app = express();

app.use(express.json());
app.use(express_fileupload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`));
app.use(cors({ origin: 'http://localhost:5000' }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use('/product', productRoute);
app.use('/user', userRoute);
app.use('/spaceship', spaceshipRoute);
app.use('/userProduct', userProductRoute);
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Cant find ${req.originalUrl} on the server, ${__dirname}`,
  });
  next();
});
module.exports = app;
