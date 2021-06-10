const productServices = require('../services/productServices');
const responseNCodes = require('../utilities/errorsNCodes');
const { OK, CREATED } = responseNCodes;

const getAllProducts = async (_req, res) => {
  const allProducts = await productServices.getAll();
  return res.status(OK).json({ products: allProducts });
};

const create = async (req, res) => {
  const newProduct = req.body;
  const result = await productServices.createProduct(newProduct);
  return res.status(CREATED).json(result);
};

const search = async (req, res) => {
  const { id } = req.params;
  const result = await productServices.getById(id);
  return res.status(OK).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  const result = await productServices.updateById(id, newData);
  return res.status(OK).json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await productServices.deleteById(id);
  return res.status(OK).json(result);
};

module.exports = { create, search, update, remove };
