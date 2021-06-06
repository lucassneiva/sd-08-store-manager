const Joi = require('@hapi/joi');

const MIN_name = 5;
const MAX_name = 50;

const QUANTITY_MIN = 1;

const validName = Joi.object({
  name: Joi.string()
    .min(MIN_name)
    .max(MAX_name)
    .required(),
});

const validQuantity = Joi.object({
  quantity: Joi.number()
    .integer()
    .min(QUANTITY_MIN)
    .required()
});

const validProduct = ({ name, quantity }) => {
  const isName = validName.validate({ name: name });
  const isQuantity = validQuantity.validate({ quantity: quantity });
  if (isName.error) return isName;
  if (isQuantity.error) return isQuantity;
  return { value: { ...isName.value, ...isQuantity.value } };
};

const validQuantitySale = (quantity) => validQuantity.validate(quantity);

module.exports = {
  validProduct,
  validQuantitySale,
};


// module.exports = (newData) => {
//   const result = schema.validate(newData);
//   if(result.error) {
//     return result;
//   }
//   return result;
// };


