const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const validatorRegister = [
  //esto proviene de los models de users
  check("name").exists().notEmpty().isLength({ min: 3, max: 90 }),
  check("age").exists().notEmpty().isNumeric(),
  check("password").exists().notEmpty().isLength({ min: 6, max: 16 }),
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
const validatorLogin = [
  //esto proviene de los models de users
  check("password").exists().notEmpty().isLength({ min: 6, max: 16 }),
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
module.exports = { validatorRegister, validatorLogin };
/* .isLength({min:5,max:90}) */
