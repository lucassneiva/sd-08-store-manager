const salesServices = require('../services/salesServices');

// Controller puxa/utiliza os services ou, dependendo, diretamente o models
const { responseNCodes } = require('../utilities/errorsNCodes');
const { OK } = responseNCodes;

const getAll = async (_req, res) => {
  const allsales = await salesServices.getAllSales();
  return res.status(OK).send({ sales: allsales });
};

const create = async (req, res) => {
  const product = req.body;
  const result = await salesServices.createSale(product);
  return res.status(OK).send(result);
};

const search = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.getById(id);
  return res.status(OK).send(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  const result = await salesServices.updateById(id, newData);
  return res.status(OK).send(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.deleteById(id);
  return res.status(OK).send(result);
};

module.exports = { getAll, create, search, update, remove };
