// tslint:disable: object-literal-sort-keys
import express, { Application, Response } from 'express';
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const app: Application = express();
dotenv.config({ path: './.env' });

mongoose.connect(process.env.MONGO_DB_URI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  // tslint:disable: no-console
  .then(() => console.log('connected to db.'))
  .catch((err) => console.log(err));

mongoose.connection.on('error', (err: Error) => console.log('db error:' + err));

const postRoutes = require('./routes/posts/post').router;
const userRoutes = require('./routes/users/users').router;
const followingRoutes = require('./routes//users/followers').router;
const errorRoutes = require('./routes/errors/error').notAuthorizedErrorRoute;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes, followingRoutes);
app.use('/api', errorRoutes);

app.get('/*', (req, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const port = process.env.PORT;
const server = app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`listening on port ${port}`);
});

server.timeout = 1000 * 15;
if (process.env.NODE_ENV === 'development') {
  server.timeout = 1000 * 20;
}
