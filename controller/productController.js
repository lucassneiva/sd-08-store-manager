const products = require('../services/productService');
const {error, update, success} = require('../services/responseType');
const { checkProduct } = require('../middlewares/index');

const createProduct = async (req, res) => {
  const {name, quantity} = req.body;
  try {
    checkProduct(req, res);
    const data = await products.createProduct(name, quantity);
    if(data.err) return res.status(error).json(data);
    res.status(update).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getAll = async(_req, res) => {
  try {
    const data = await products.getAll();
    res.status(success).json(data);
  } catch (error) {
    res.status(error).json(error);
  }
};

const getById = async(req, res) => {
  const { id } = req.params;
  try {
    const data = await products.getById(id);
    if(data.err) return res.status(error).json(data);
    res.status(success).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const updateProduct = async(req, res) => {
  const { id } = req.params;
  const{ name, quantity } = req.body;
  try {
    checkProduct(req, res);
    const data = await products.updateProduct(id, name, quantity);
    if(data.err) return res.status(error).json(data);
    res.status(success).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createProduct, getAll, getById, updateProduct
};
