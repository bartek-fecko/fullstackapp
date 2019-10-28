import express, { Application, request } from 'express';
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app: Application = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  // tslint:disable-next-line: no-console
  .then(() => console.log('connected to db.'));

// tslint:disable-next-line: no-console
mongoose.connection.on('error', (err: Error) => console.log('db error:' + err));

const postRoutes = require('./routes/posts/post').router;

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/posts', postRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`listening on port ${port}`);
});
