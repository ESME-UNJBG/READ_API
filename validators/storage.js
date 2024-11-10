const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorGetItem = [
  //esto proviene de los models de traks
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
module.exports = { validatorGetItem };
/* .isLength({min:5,max:90}) */
