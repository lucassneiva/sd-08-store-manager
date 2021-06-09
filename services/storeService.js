const Joi = require('joi');

const StoreModel = require('../models/storeModel');

const requestDataIsValid = (name, quantity) => {
  const requiredNonEmptyString = Joi.string().not().empty().required();
  const requiredNonEmptyNumber = Joi.number().not().empty().required();
  const minLengthNameString = 5;
  const minValueQuantityNumber = 1;

  return Joi.object({
    name: requiredNonEmptyString.min(minLengthNameString),
    quantity: requiredNonEmptyNumber.integer().min(minValueQuantityNumber),
  }).validate({ name, quantity });
};

const create = async ({ name, quantity }) => {
  const { error } = requestDataIsValid(name, quantity);
  // console.log('STORESERVICE', error);
  if (error) {
    const { isJoi, details } = error;
    // console.log('entrou no erro', { isJoi, details });
    return { isJoi, details };
  }
  // console.log('não entrou no IF de erro');
  const existingProduct = await StoreModel.findByName(name);
  if(existingProduct) return { message: 'Product already exists'};
  
  return await StoreModel.create({ name, quantity });
};

module.exports = {
  create,
};
