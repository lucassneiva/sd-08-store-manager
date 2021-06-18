const Joi = require('@hapi/joi');

const STRING_MIN_VALUE = 5;

const schemaProducts = Joi.object({
  name:Joi.string().not().empty().min(STRING_MIN_VALUE).required(),
  quantity:Joi.number().not().empty().min(1).required(),
});

module.exports=schemaProducts;