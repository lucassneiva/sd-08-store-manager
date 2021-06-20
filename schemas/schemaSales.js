const Joi = require('@hapi/joi');


const schemaSales = Joi.object({
  productId: Joi
    .string()
    .required(),
  quantity: Joi
    .number()
    .min(1)
    .required()
}).messages({
  'any.required': 'Wrong product ID or invalid quantity',
  'number.base': 'Wrong product ID or invalid quantity',
  'number.min': 'Wrong product ID or invalid quantity'
  
});
const schemaSalesforArray = Joi.array().items(schemaSales);

module.exports=schemaSalesforArray;