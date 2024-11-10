const fs = require("fs");
const { storageModel } = require("../models");
const PUBLIC_URL = process.env.PUBLIC_URL;
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const MEDIO_PAHT = `${__dirname}/../storage`;
/**
 * OBTENER LISTA DE LA BASE DE DATOS
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "Error de list item");
  }
};

/**
 * OBTENER DETALLE
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    //req = matchedData(req);
    const { id } = matchedData(req);
    const data = await storageModel.findById(id);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "Error Get item");
  }
};

/**
 * OBTENER UN REGISTRO
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const { file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await storageModel.create(fileData);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "Error de crear item");
  }
};
const deleteItem = async (req, res) => {
  try {
    //req = matchedData(req);
    const { id } = matchedData(req);
    const dataFile = await storageModel.findById(id);
    await storageModel.delete({ _id: id });
    const { filename } = dataFile;
    const filePath = `${MEDIO_PAHT}/${filename}`; //lo qu esta en mji disco local D:
    /*  fs.unlinkSync(filePath); */
    const data = {
      filePath,
      deleted: 1,
    };
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "Error de eliminar item");
  }
};
module.exports = { getItems, getItem, createItem, deleteItem };
