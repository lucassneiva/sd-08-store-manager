const productsServices = require('../services/productsServices');

const UNPROCEESSABLE_ENTITY = 422;
const CREATED = 201;
const OK = 200;

const create = async (req, res) => {
  const product = req.body;
  const validation = productsServices.validProduct(product);
  if (validation) return res.status(UNPROCEESSABLE_ENTITY).json(validation);
  const result = await productsServices.create(product);
  if (result.err) return res.status(UNPROCEESSABLE_ENTITY).json(result);
  res.status(CREATED).json(result);
};

const getAll = async (_req, res) => {
  const result = await productsServices.getAll();
  if (result.err) return res.status(UNPROCEESSABLE_ENTITY).json(result);
  return res.status(OK).json(result);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await productsServices.findById(id);
  if (result.err) return res.status(UNPROCEESSABLE_ENTITY).json(result);
  res.status(OK).json(result);
};

module.exports = {
  create,
  getAll,
  findById,
};
