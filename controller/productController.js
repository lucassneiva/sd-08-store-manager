const products = require('../services/productService');
const {error, update, success} = require('../services/responseType');
const { checkProduct } = require('../middlewares/index');

const createProduct = async (req, res) => {
  const {name, quantity} = req.body;
  checkProduct(req, res);
  const data = await products.createProduct(name, quantity);
  if(data.err) return res.status(error).json(data);
  res.status(update).json(data);
};

const getAll = async(_req, res) => {
  const data = await products.getAll();
  res.status(success).json(data);
};

const getById = async(req, res) => {
  const { id } = req.params;
  const data = await products.getById(id);
  if(data.err) return res.status(error).json(data);
  return res.status(success).json(data);
};

const updateProduct = async(req, res) => {
  const { id } = req.params;
  const{ name, quantity } = req.body;
  checkProduct(req, res);
  const data = await products.updateProduct(id, name, quantity);
  if(data.err) return res.status(error).json(data);
  res.status(success).json(data);
};

const deleteProduct = async(req, res) => {
  const { id } = req.params;
  const data = await products.deleteProduct(id);
  if(data.err) return res.status(error).json(data);
  return res.status(success).json(data);
};

module.exports = {
  createProduct, getAll, getById, updateProduct, deleteProduct
};
