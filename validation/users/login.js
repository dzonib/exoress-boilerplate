const Validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = function validateLogin(data) {
  let {email, password} = data;

  let errors = {}

  email = email ? email : '';
  password = password ? password : '';

  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  }

  if(!Validator.isEmail(email)) {
    errors.email = 'Invalid email'
  }

  if (Validator.isEmpty(password)) {
    error.password = 'Password field is required';
  }

  return {errors, isValid: isEmpty(errors)}
}