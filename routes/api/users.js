const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/user');
const router = express.Router();
const validateRegistration = require('../../validation/users/register');
const validateLogin = require('../../validation/users/login');
const secretOrKey = require('../../config/keys').secretOrKey;

router.post('/register', async(req, res) => {
  const {email, name, password} = req.body;

  const {errors, isValid} = validateRegistration(req.body);

  const user = await User.findOne({email});

  if (user) {
    errors.email = 'User already registerd';
    return res
      .status(400)
      .json(errors)
  }

  if (!isValid) {
    return res.json(errors)
  }

  const newUser = await new User({name, email, password});

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newUser.password, salt);

  newUser.password = hash
  await newUser.save()
  res.json(newUser)
});

// LOGIN

router.post('/login', async(req, res) => {
  const {email, password} = req.body;

  const {errors, isValid} = validateLogin(req.body);

  if (!isValid) {
    return res
      .status(400)
      .json(errors);
  };

  const user = await User.findOne({email});

  if (!user) {
    errors.email = 'User is not registred'
    return res
      .status(400)
      .json({errors});
  };

  const isMatched = await bcrypt.compare(password, user.password);

  if (isMatched) {
    const payload = {
      id: user.id,
      name: user.name
    }

    const token = await jwt.sign(payload, secretOrKey, {expiresIn: 3600});

    return res.json({success: 'true', token: `Bearer ${token}`})
  };

  errors.password = 'Passwords do not match'
  res.json(errors)
});

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json(req.user)
});

module.exports = router;