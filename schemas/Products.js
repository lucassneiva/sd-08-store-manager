const Joi = require('joi');

const MIN_NAME_LENGTH = 5;
const MIN_QUANTITY = 1;

const insert = Joi.object({
  name: Joi.string().min(MIN_NAME_LENGTH).required(),
  quantity: Joi.number().integer().min(MIN_QUANTITY).required(),
}).messages({ 'number.min': `{#label} must be larger than or equal to ${MIN_QUANTITY}` });

const update = Joi.object({
  name: Joi.string().min(MIN_NAME_LENGTH).required(),
  quantity: Joi.number().integer().min(MIN_QUANTITY).required(),
});

module.exports = {
  insert,
  update,
};
