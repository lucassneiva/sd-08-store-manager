const Joi = require('@hapi/joi');

const MIN_name = 5;
const MAX_name = 50;

const QUANTITY_MIN = 1;

const schema = Joi.object({
  name: Joi.string()
    .min(MIN_name)
    .max(MAX_name)
    .required(),
  quantity: Joi.number()
    .integer()
    .min(QUANTITY_MIN)
    .required()
});


module.exports = (newData) => {
  const result = schema.validate(newData);
  if(result.error) {
    return result;
  }
  return result;
};


