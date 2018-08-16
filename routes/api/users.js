const express = require('express');
const bcrypt = require('bcryptjs')

const User = require('../../models/user');
const router = express.Router();
const validateRegistration = require('../../validation/users/register');
const validateLogin = require('../../validation/users/login')

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

router.post('/login', async (req, res) => {
  const {email, password} = req.body;

  const {errors, isValid} = validateLogin(req.body);

  if (!isValid) {
    res.status(400).json(errors)
  }

  const user = await User.findOne({email});
  
  if (!user) {
    errors.email = `User with email "${email}" is not registred`
    res.status(400).json({errors});
  };

  const isMatched = await bcrypt.compare(password, user.password);

  if (isMatched) {
    res.json({jwt: 'next'})
  }

})

module.exports = router;