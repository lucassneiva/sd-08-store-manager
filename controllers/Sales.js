const SalesServices = require('../services/Sales');

const create = async (req, res) => {
  const result = await SalesServices.create(req.body);
  res.json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await SalesServices.getById(id);
  if (result.err) return next(result);
  res.json(result);
};

const getAll = async (_req, res) => {
  const result = await SalesServices.getAll();
  res.json({ sales: result });
};

module.exports = {
  create,
  getById,
  getAll
};
