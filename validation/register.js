const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  const whiteListed =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
  let errors = {};

  // Makes data an empty string if it's empty before using validator
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Username validation
  if (validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  if (!validator.isLength(data.username, { min: 3, max: 20 })) {
    errors.username = "Username must be between 3 and 20 characters";
  }

  if (!validator.isWhitelisted(data.username, whiteListed)) {
    errors.username =
      "Letters, numbers, dashes, and underscores only. Please try again without symbols or spaces.";
  }

  // Email validation
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password validation
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password must be between 8 and 30 characters";
  }

  if (validator.contains(data.password, " ")) {
    errors.password = "Password cannot contain spaces";
  }

  // Confirmation password validation
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
