const Joi = require('@hapi/joi');

const MIN_name = 5;
const MAX_name = 50;

const schema = Joi.object({
  name: Joi.string()
    .min(MIN_name)
    .max(MAX_name)
    .required(),
  quantity: Joi.number()
    .integer()
    .positive()
    .min(1)
    .required()
});


module.exports = (newData) => {
  const result = schema.validate(newData);
  if(result.error) {
    return result;
  }
  return result;
};


