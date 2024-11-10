//Array con roles permitidos
const { handleHttpError } = require("../utils/handleError");
const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    console.log({ user });
    const rolesByUser = user.role;
    //evalua los roles de ["admin","manager" etc....]
    const checkValueRol = roles.some((rolSingle) =>
      rolesByUser.includes(rolSingle)
    );
    if (!checkValueRol) {
      handleHttpError(res, "Error de usauario permiso", 403);
    }
    next();
  } catch (e) {
    handleHttpError(res, "Error_permision", 403);
  }
};
module.exports = checkRol;
