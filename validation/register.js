const validator = require("validator");
const passwordValidator = require("password-validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  const passwordSchema = new passwordValidator();
  const whiteListed =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
  let errors = {};

  passwordSchema
    .is()
    .min(8)
    .is()
    .max(30)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits()
    .has()
    .not()
    .spaces();

  // Makes data an empty string if it's empty before using validator
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Username validation
  if (!validator.isLength(data.username, { min: 3, max: 20 })) {
    errors.username = "Username must be between 3 and 20 characters";
  }

  if (validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  if (!validator.isWhitelisted(data.username, whiteListed)) {
    errors.username =
      "Letters, numbers, dashes, and underscores only. Please try again without symbols or spaces.";
  }

  // Email validation
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  // Password validation
  if (!passwordSchema.validate(data.password)) {
    errors.password =
      "Password must contain upper & lowercase letters, numbers, special characters, and be between 8 & 30 characters";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
