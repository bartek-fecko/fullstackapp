const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(morgan('dev'));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
