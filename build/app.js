"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express_1.default();
dotenv.config({ path: './.env' });
mongoose.connect(process.env.MONGO_DB_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    // tslint:disable: no-console
    .then(() => console.log('connected to db.'))
    .catch((err) => console.log(err));
mongoose.connection.on('error', (err) => console.log('db error:' + err));
const postRoutes = require('./routes/posts/post').router;
const userRoutes = require('./routes/users/users').router;
const followingRoutes = require('./routes//users/followers').router;
const errorRoutes = require('./routes/errors/error').notAuthorizedErrorRoute;
app.use(cors());
app.use(morgan('dev'));
app.use(express_1.default.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express_1.default.static(path.join(__dirname, '../client/build')));
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes, followingRoutes);
app.use('/api', errorRoutes);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
const port = process.env.PORT;
const server = app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`listening on port ${port}`);
});
server.timeout = 1000 * 10;
if (process.env.NODE_ENV === 'development') {
    server.timeout = 1000 * 15;
}
