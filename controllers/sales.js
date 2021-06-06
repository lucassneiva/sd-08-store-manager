const rescue = require('express-rescue');
const Joi = require('joi');
const Sales = require('../services/sales');

const { SUCCESS, CREATED, INVALID_DATA, MIN_STR_LENGTH } = require('../constants');

const registerSale = rescue(async (req, res, next) => {
  const { error } = Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().min(1).strict().required(),
    })
  ).validate(req.body);

  if (error) {
    return res.status(INVALID_DATA).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }

  const product = await Sales.registerSales(req.body);

  if (product.error) return res.status(INVALID_DATA).json(product.error);

  return res.status(SUCCESS).json(product);
});

module.exports = {
  registerSale
};
