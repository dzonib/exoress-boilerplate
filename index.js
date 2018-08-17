const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport')

const db = require('./config/keys').mongoURI;
const usersRouter = require('./routes/api/users');

mongoose
  .connect(db, {useNewUrlParser: true})
  .then(console.log('connected to db'))
  .catch(e => console.log(`MONGOOSE ERROR --> ${e}`));


const app = express();

app.use(bodyParser.json());

app.use(passport.initialize());

require('./config/passport')(passport)

app.use('/api/users', usersRouter);


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));