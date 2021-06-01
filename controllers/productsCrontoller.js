const {
  productValidation,
  createProductService,
} = require('../services/productsService');

const ERROR = 422;
const CREATED = 201;

const createProductController = async (req, res, next) => {
  const product = req.body;
  const response = productValidation(product);
  if (response) return res.status(ERROR).json(response);
  const result = await createProductService(product);
  if (result.err) return res.status(ERROR).json(result);
  res.status(CREATED).json(result);
};

module.exports = {
  createProductController,
};
