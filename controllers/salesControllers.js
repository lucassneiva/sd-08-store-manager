const salesServices = require('../services/salesServices');

const UNPROCEESSABLE_ENTITY = 422;
const CREATED = 201;
const OK = 200;
const NOTFOUND = 404;

const create = async (req, res) => {
  const sale = req.body;
  const validSale = salesServices.validSale(sale);
  if (validSale.err) res.status(UNPROCEESSABLE_ENTITY).json(validSale);
  const result = await salesServices.create(sale);
  res.status(OK).json(result);
};

const getAll = async (_req, res) => {
  const result = await salesServices.getAll();
  res.status(OK).json(result);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.findById(id);
  if (result.err) return res.status(NOTFOUND).json(result);
  res.status(OK).json(result);
};

module.exports = {
  create,
  getAll,
  findById,
};
