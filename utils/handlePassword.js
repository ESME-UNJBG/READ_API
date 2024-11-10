const bcryptjs = require("bcryptjs");

//contraseña encriptada hash
const encrypt = async (passwordPlain) => {
  const hash = await bcryptjs.hash(passwordPlain, 10);
  return hash;
};
//contraseña encriptada hash comparacion de ambas
const compare = async (passwordPlain, hashPassword) => {
  return await bcryptjs.compare(passwordPlain, hashPassword);
};
module.exports = { encrypt, compare };
