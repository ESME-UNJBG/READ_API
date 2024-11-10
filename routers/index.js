const express = require("express");
const router = express.Router();
const fs = require("fs");
const removeExtension = (fileName) => {
  return fileName.split(".").shift();
};
const PATH_ROUTES = __dirname;
fs.readdirSync(PATH_ROUTES).filter((file) => {
  const name = removeExtension(file); //tdodusers, storage, traks
  if (name !== "index") {
    console.log(`cargando ruta ${name}`);
    router.use(`/${name}`, require(`./${file}`)); //todo http://localhost:3000/api/traks
  }
});

module.exports = router;
