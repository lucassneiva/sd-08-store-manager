const salesServices = require('../services/salesServices');

const UNPROCEESSABLE_ENTITY = 422;
const CREATED = 201;
const OK = 200;

const create = async (req, res) => {
  const sale = req.body;
  const validSale = salesServices.validSale(sale);
  if (validSale.err) res.status(UNPROCEESSABLE_ENTITY).json(validSale);
  const result = await salesServices.create(sale);
  res.status(OK).json(result);
};

module.exports = {
  create,
};
