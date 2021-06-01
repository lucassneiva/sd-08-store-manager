const productsServices = require('../services/productsServices');

const UNPROCEESSABLE_ENTITY = 422;
const CREATED = 201;
const create = async (req, res) => {
  const product = req.body;
  const validation = productsServices.validProduct(product);
  if (validation) return res.status(UNPROCEESSABLE_ENTITY).json(validation);
  const result = await productsServices.create(product);
  if (result.err) return res.status(UNPROCEESSABLE_ENTITY).json(result);
  res.status(CREATED).json(result);
};

module.exports = {
  create,
};
