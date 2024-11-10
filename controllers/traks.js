const { matchedData } = require("express-validator");
const { traksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
/**
 * OBTENER LISTA DE LA BASE DE DATOS
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const user = req.user;
    const data = await traksModel.findAllData({});
    res.send({ data, user });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "Error de datos");
  }
};

/**
 * OBTENER DETALLE
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await traksModel.findOneData(id);
    res.send({ data });
  } catch (e) {
    console.log(e);
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
    const body = matchedData(req);
    const data = await traksModel.create(body);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "Error create item");
  }
};
/**
 * OBTENER ACTUALIZAR
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await traksModel.findOneAndUpdate({ _id: id }, body);
    res.send({ data });
  } catch (e) {
    //console.log(e);
    handleHttpError(res, "Error de actualizar item");
  }
};
/**
 * ELIMINA UN REGISTRO
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await traksModel.delete({ _id: id });
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "Error delete item");
  }
};
module.exports = { getItems, getItem, createItem, deleteItem, updateItem };
