const rescue = require('express-rescue');
const productService = require('../services/productService');

const create = rescue(async(req, res, next) => {
  const { name, quantity } = req.body;
  const resultService = await productService.productCreate({ name, quantity });
  console.log(resultService);
  if (resultService.err) return next(resultService);
  return res.status(resultService.status).json(resultService.result);
});

module.exports = {
  create,
};
