const express = require("express");
const router = express.Router();
const { loginctrl, registerctrl } = require("../controllers/auth");
const { validatorRegister, validatorLogin } = require("../validators/auth");
router.post("/register", validatorRegister, registerctrl);
router.post("/login", validatorLogin, loginctrl);
module.exports = router;
