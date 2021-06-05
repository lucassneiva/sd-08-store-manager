const { ObjectId } = require('mongodb');
const ProductsModel = require('../models/ProductsModel');
const productsService = require('../services/productsService');

const SUCCESS = 200;
const CREATED = 201;
const UNPROCESSABLE = 422;
const BAD_REQUEST = 500;

const error = {
  err: {
    code: 'invalid_data',
    message: ''
  }
};

const getAll = async (_req, res) => {
  try {
    const products = await ProductsModel.getAll();

    res.status(SUCCESS).json({ products });
  } catch (err) {
    res.status(BAD_REQUEST).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductsModel.getById(id);

    if (!product) {
      error.err.message = 'Wrong id format';
      return res.status(UNPROCESSABLE).json(error);
    };

    res.status(SUCCESS).json(product);
  } catch (err) {
    res.status(BAD_REQUEST).json({ message: err.message });
  }
};

const add = async (req, res) => {
  try {
    const { name, quantity } = req.body;

    await productsService.isValidName(name);
    await productsService.productAlreadyExists(name);
    await productsService.isValidQuantity(quantity);

    const newProduct = await ProductsModel.add(name, quantity);

    res.status(CREATED).json(newProduct);
  } catch (err) {
    error.err.message = err.message;
    res.status(UNPROCESSABLE).json(error);
  }
};

const update = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    await productsService.isValidName(name);
    await productsService.isValidQuantity(quantity);

    const product = await ProductsModel.update(id, name, quantity);

    res.status(SUCCESS).json(product);
  } catch (err) {
    error.err.message = err.message;
    res.status(UNPROCESSABLE).json(error);
  }
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      error.err.message = 'Wrong id format';
      return res.status(UNPROCESSABLE).json(error);
    };

    await ProductsModel.exclude(id);

    res.status(SUCCESS).end();
  } catch (err) {
    error.err.message = err.message;
    res.status(UNPROCESSABLE).json(error);
  }
};

module.exports = {
  getAll,
  add,
  getById,
  update,
  exclude
};
