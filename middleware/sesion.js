const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { usersModel } = require("../models");
const authMiddware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "No token", 401);
      return;
    }
    //llega el token de verificacion
    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);
    if (!dataToken._id) {
      handleHttpError(res, "No id de token", 401);
      return;
    }
    const user = await usersModel.findById(dataToken._id);
    req.user = user;
    next();
  } catch (e) {
    handleHttpError(res, "No sesion", 401);
  }
};
module.exports = authMiddware;
