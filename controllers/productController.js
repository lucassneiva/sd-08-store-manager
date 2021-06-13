// Controller puxa/utiliza os services ou, dependendo, diretamente o models
const productServices = require('../services/productServices');
const { responseNCodes } = require('../utilities/errorsNCodes');
const { OK, CREATED } = responseNCodes;

const getAll = async (_req, res) => {
  const allProducts = await productServices.getAllProducts();
  return res.status(OK).send({ products: allProducts });
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productServices.createProduct(name, quantity);
  return res.status(CREATED).send(result);
};

const search = async (req, res) => {
  const { id } = req.params;
  const result = await productServices.getById(id);
  return res.status(OK).send(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  const result = await productServices.updateById(id, newData);
  return res.status(OK).send(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await productServices.deleteById(id);
  return res.status(OK).send(result);
};

module.exports = { getAll, create, search, update, remove };
