const Joi = require('joi');
const { findByNameProduct } = require('./models/productsModel');

const addProductValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().integer().min(1).required()
  });

  return Joi.validate(data, schema);
};

const nameValidation = async (name) => {
  const result = findByNameProduct(name);
  return result;
};

module.exports = {
  addProductValidation,
  nameValidation,
};

