const { catalogProduct } = require('../services');
const { productModel } = require('../models');
const {
  HTTP_CREATED_STATUS,
  HTTP_UNPROCESSABLE_ENTITY_STATUS,
  HTTP_OK_STATUS
} = require('../config/constant/httpStatus');
const { HandleCustomerError } = require('../Middlewares/handleError');

exports.getAll =  async (_req, res) => {
  try {
    const response = await productModel.getAll();
    res.status(HTTP_OK_STATUS).json(response);
  } catch (error) {
    const messageError = new HandleCustomerError(error.message);
    res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).json(messageError.getMessageError());
  }
};

exports.getById =  async (req, res) => {
  try {
    const { id } = req.params;
    const response = await productModel.getById(id);
    res.status(HTTP_OK_STATUS).json(response);
  } catch (error) {
    const messageError = new HandleCustomerError(error.message);
    res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).json(messageError.getMessageError());
  }
};

exports.post =  async (req, res) => {
  try {
    const product = req.body;
    const response = await catalogProduct.registerProduct(product);
    res.status(HTTP_CREATED_STATUS).json(response);
  } catch (error) {
    const messageError = new HandleCustomerError(error.message);
    res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).json(messageError.getMessageError());
  }
};

// exports.getAll = (req, res) => {};
// exports.getById = (req, res) => {};
// exports.create = (req, res) => {};
// exports.update = (req, res) => {};
// exports.exclude = (req, res) => {};
