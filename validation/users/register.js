const Validator = require('validator');
const isEmpty = require("../isEmpty")

module.exports = function validateRegistration(data) {
  console.log(data)
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if(!Validator.isLength(data.name, {min: 2, max: 20})) {
    errors.name = 'Name must be between 2 and 20 charachters long';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}