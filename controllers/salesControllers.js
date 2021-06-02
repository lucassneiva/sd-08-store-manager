const salesServices = require('../services/salesServices');

const UNPROCEESSABLE_ENTITY = 422;
const CREATED = 201;
const OK = 200;
const NOTFOUND = 404;
const MINUS_OPERATOR = -1;

const create = async (req, res) => {
  const sale = req.body;
  const validSale = salesServices.validSale(sale);
  if (validSale) res.status(UNPROCEESSABLE_ENTITY).json(validSale);
  const result = await salesServices.create(sale);
  await salesServices.quantityUpdate(sale, MINUS_OPERATOR);
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

const updateOne = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const validSale = salesServices.validSale(sale);
  if (validSale) return res.status(UNPROCEESSABLE_ENTITY).json(validSale);
  const oldSale = await salesServices.findById(id);
  const result = await salesServices.updateOne(id, sale);
  await salesServices.quantityUpdate(oldSale.itensSold, 1);
  await salesServices.quantityUpdate(sale, MINUS_OPERATOR);
  res.status(OK).json(result);
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  const sale = await salesServices.findById(id);
  const result = await salesServices.deleteOne(id);
  if (result.err) return res.status(UNPROCEESSABLE_ENTITY).json(result);
  await salesServices.quantityUpdate(sale.itensSold, 1);
  res.status(OK).json(result);
};

module.exports = {
  create,
  getAll,
  findById,
  updateOne,
  deleteOne,
};
