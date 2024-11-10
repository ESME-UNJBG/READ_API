const express = require("express");
const router = express.Router();
const {
  getItems,
  createItem,
  getItem,
  updateItem,
  deleteItem,
} = require("../controllers/traks");
const checkRol = require("../middleware/role");
const authMiddware = require("../middleware/sesion");
//todo//localhost/traks Get POSt DELETE PUT

const {
  validatorCreateItem,
  validatorGetItem,
} = require("../validators/traks");

//ruta de crear un items
router.get("/", authMiddware, getItems);
//ruta de generar un registro item
router.post(
  "/",
  authMiddware,
  checkRol(["user", "admin"]),
  validatorCreateItem,
  createItem
);
//ruta de tener un detalle
router.get("/:id", authMiddware, validatorGetItem, getItem);
//ruta de actualizacion
router.put(
  "/:id",
  authMiddware,
  validatorGetItem,
  validatorCreateItem,
  updateItem
);
//eliminar un registro
router.delete("/:id", authMiddware, validatorGetItem, deleteItem);
module.exports = router;
