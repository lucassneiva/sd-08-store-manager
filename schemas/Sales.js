const Joi = require('joi');

const PRODUCT_ID_LENGTH = 24;
const MIN_QUANTITY = 1;

const insert = Joi.array().items({
  productId: Joi.string().length(PRODUCT_ID_LENGTH).required(),
  quantity: Joi.number().integer().min(MIN_QUANTITY).required(),
}).messages({
  'number.min': 'Wrong product ID or invalid quantity',
  'number.base': 'Wrong product ID or invalid quantity',
});

const update = Joi.array().items({
  productId: Joi.string().length(PRODUCT_ID_LENGTH),
  quantity: Joi.number().integer().min(MIN_QUANTITY),
}).messages({
  'number.min': 'Wrong product ID or invalid quantity',
  'number.base': 'Wrong product ID or invalid quantity',
});

module.exports = {
  insert,
  update,
};
