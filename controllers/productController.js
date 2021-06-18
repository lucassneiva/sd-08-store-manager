const productsServices = require('../services/productsService');

const getAll = async (_req, res) => {
  const result = await productsServices.getAll();
  if (result.err) return res.status(422).json(result);
  return res.status(200).json(result);
};

module.exports = { getAll };
