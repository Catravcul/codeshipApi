const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = require('./app');
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('connection successfull'))
  .catch((err) => console.log(err.message));
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: 'http://localhost:' + PORT}));
app.listen(PORT, () => {
  console.log(`http://127.0.0.1:${PORT}`);
});
