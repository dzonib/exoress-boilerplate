const Validator = require('validator');
const isEmpty = require('../isEmpty');


module.exports = function validateLogin(data) {
  const {email, password} = data;

  const errors = {}

  const emailCheck = email ? email : '';
  const passwordCheck = password ? password : '';

  if (Validator.isEmpty(emailCheck)) {
    errors.email = 'Email field is required';
  }

  if(!Validator.isEmail(emailCheck)) {
    errors.email = 'Invalid email'
  }

  if (Validator.isEmpty(password)) {
    error.password = 'Password field is required';
  }

  return {errors, isValid: isEmpty(errors)}
}