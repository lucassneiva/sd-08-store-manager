const productModel = require('../models/productModel');

const HTTP_STATUS_OK = 200;
const INTERNAL_ERROR = 500;
const UPDATE_STATUS = 201;
const UNPROCESSABLE_ENTITY = 422;

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.status(HTTP_STATUS_OK).json({ products });
  } catch (err) {
    console.error();
    res.status(UNPROCESSABLE_ENTITY).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productModel.getProductById(id);

    if(!result) {
      return res.status(UNPROCESSABLE_ENTITY).json({ 
        err: {
          code: 'invalid_data',
          message: 'Wrong id format'
        }
      });
    }

    res.status(HTTP_STATUS_OK).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(INTERNAL_ERROR).json({ message: err.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productModel.addProduct(name, quantity);

    res.status(UPDATE_STATUS).json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(INTERNAL_ERROR).json({ message: err.message });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  getProductById
};