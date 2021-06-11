const Joi = require('joi');
const { ObjectId } = require('mongodb');

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
  if (error) {
    const { isJoi, details } = error;
    return { isJoi, details };
  }
  const existingProduct = await StoreModel.findByName(name);
  if(existingProduct) return { message: 'Product already exists'};
  
  return await StoreModel.create({ name, quantity });
};

const getAll = async () => {
  const products = await StoreModel.getAll();
  return products;
};

const findById = async (id) => {
  if(!ObjectId.isValid(id)) return { message: 'Wrong id format' };
  const product = await StoreModel.findById(id);
  if (!product) return { message: 'Wrong id format' };
  return product;
};

const updateById = async (id, name, quantity) => {
  if(!ObjectId.isValid(id)) {
    // console.log('entrou no id');
    return { message: 'Wrong id format' };
  }
  const { error } = requestDataIsValid(name, quantity);
  if (error) {
    // console.log('entrou no Joi');
    const { isJoi, details } = error;
    return { isJoi, details };
  }

  const { modifiedCount } = await StoreModel.updateById(id, name, quantity);
  // if (!modifiedCount) {
  //   console.log('entrou no id nao encontrado', modifiedCount);
  //   return { message: 'Nothing to change' };
  // }
  return { modifiedCount };
};

module.exports = {
  create, getAll, findById, updateById
};
