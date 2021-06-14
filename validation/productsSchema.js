const Joi = require('joi');

function isValid(data) {
  const MIN_LENGTH = 5;
  const schema = Joi.object({
    name: Joi.string().min(MIN_LENGTH).required(),
    quantity: Joi.number().integer().min(1).strict().required(),
  });

  const { error } = schema.validate(data);
  if(error) return error;

  return true;
}

// console.log(isValid({name: 'ddfdsflas', quantity: 2}));

module.exports = {
  isValid,
};
