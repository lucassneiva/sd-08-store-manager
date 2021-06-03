const {
  createSalesService,
  salesValidation,
} = require('../services/salesService');

const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY= 422;

const createSalesController = async (req, res) => {
  const sales = req.body;
  const validation = salesValidation(sales);
  if (validation.err) return res.status(UNPROCESSABLE_ENTITY).json(validation);
  const create = await createSalesService(sales);
  res.status(OK).json(create);
};

module.exports = {
  createSalesController,
};
