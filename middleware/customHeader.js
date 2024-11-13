const { body } = require("express-validator");
const customHeader = (req, res, next) => {
  try {
    const apikey = req.headers.api_key;
    if (apikey === "leifer-01") {
      next();
    } else {
      res.status(403);
      res.send({ error: "API_KEY_NO" });
    }
  } catch (e) {
    res.status(403);
    res.send({ error: "ALGO_SALIO_MAL" });
  }
};
module.exports = customHeader;
//200 exitosa
//201 registro
//404 la ruta no existe
//403 no puedes acceder
//401 no tienes autorizacion
//500 error de server
//502 en rutador
//503 servidor no disponible
//504 tardo mas de lo debido
