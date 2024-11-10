const express = require("express");
/* const storage = require("../models/nosql/storage"); */
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const { validatorGetItem } = require("../validators/storage");
const {
  getItems,
  createItem,
  getItem,
  deleteItem,
} = require("../controllers/storage");
//http://localhost:3001/api/storage

/** */
/* const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `${__dirname}/../storage`;
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    //todo archivo tiene extensiones
    const ext = file.originalname.split(".").pop(); //todo[name,png]
    const filename = `file-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const uploadMiddleware = multer({
  storage,
}); */
/** lLISTA DE ITEMS*/
router.get("/", getItems);
/** lLISTA DETALLE DE ITEMS*/
router.get("/:id", validatorGetItem, getItem);
/** lLISTA ELIMINAR A ITEMS*/
router.delete("/:id", validatorGetItem, deleteItem);
/** CREACION DE ITEMS*/
router.post("/", uploadMiddleware.single("myfile"), createItem);
module.exports = router;
