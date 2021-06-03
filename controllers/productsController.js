const { ObjectId } = require('mongodb');
const { getAll, add, getById, update, exclude } = require('../models/ProductsModel');
const {
  verifyName,
  verifyQuantity,
  verifyProductExists
} = require('../services/productService');

const SUCCESS = 200;
const CREATED = 201;
const UNPROCESSABLE = 422;
const BAD_REQUEST = 500;

const error = {
  err: { code: 'invalid_data', message: '' }
};

const getAllProducts = async (_req, res) => {
  try {
    const products = await getAll();
    res.status(SUCCESS).json({ products });
  } catch (err) {
    console.error(err.message);
    res.status(BAD_REQUEST).json({ message: err.message });
  }
};

const getByIdProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getById(id);

    if (!product) {
      error.err.message = 'Wrong id format';
      return res.status(UNPROCESSABLE).json(error);
    };

    res.status(SUCCESS).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(BAD_REQUEST).json({ message: err.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;

    await verifyName(name);
    await verifyProductExists(name);
    await verifyQuantity(quantity);

    const newProduct = await add(name, quantity);

    res.status(CREATED).json(newProduct);
  } catch (err) {
    console.error(err.message);
    error.err.message = err.message;
    res.status(UNPROCESSABLE).json(error);
  }
};

const updateProduct = async (req, res) => {
  try {
	  const { name, quantity } = req.body;
    const { id } = req.params;

    await verifyName(name);
    await verifyQuantity(quantity);

	  const product = await update(id, name, quantity);

	  res.status(SUCCESS).json(product);
  } catch (err) {
	  console.error(err.message);
	  error.err.message = err.message;
    res.status(UNPROCESSABLE).json(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      error.err.message = 'Wrong id format';
      return res.status(UNPROCESSABLE).json(error);
    };

    await exclude(id);

    res.status(SUCCESS).end();
  } catch (err) {
    console.error(err.message);
    error.err.message = err.message;
    res.status(UNPROCESSABLE).json(error);
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  getByIdProduct,
  updateProduct,
  deleteProduct
};