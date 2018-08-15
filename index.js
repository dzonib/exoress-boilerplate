const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = require('./config/keys').mongoURI;
const usersRouter = require('./routes/api/users');

const app = express();

app.use(bodyParser.json());

app.use('/api/users', usersRouter);

mongoose
  .connect(db, {useNewUrlParser: true})
  .then(console.log('connected to db'))
  .catch(e => console.log(`MONGOOSE ERROR --> ${e}`));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));