const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { usersModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const registerctrl = async (req, res) => {
  req = matchedData(req);
  try {
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR AL REGISTRAR USUARIO");
  }
};
//controlador de logear
const loginctrl = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersModel
      .findOne({ email: req.email })
      .select("password name role ");
    if (!user) {
      handleHttpError(res, "ERROR EL USUARIO NO EXISTE", 404);
      return;
    }
    const hashPassword = user.get("password");
    const check = await compare(req.password, hashPassword);
    if (!check) {
      handleHttpError(res, "PASSWORD INVALID", 401);
      return;
    }
    user.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign(user),
      user,
    };
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR AL LOGEAR USUARIO");
  }
};

module.exports = { registerctrl, loginctrl };
