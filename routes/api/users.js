const express = require('express');

const User = require('../../models/user');
const router = express.Router();
const validateRegistration = require('../../validation/users/register');

router.post('/register', async (req, res) => {
  const {email, name, password} = req.body;
  const {errors, isValid} = await validateRegistration(req.body);


  const user = await User.find({email});

  if (user) {
    errors.email = 'User already exists';
    return res.status(400).json(errors)
  }

  if(!isValid) {
    return res.json(errors)
  }

 res.json(req.body)
})

module.exports = router;
