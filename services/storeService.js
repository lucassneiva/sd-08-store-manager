const Joi = require('joi');
const { ObjectId } = require('mongodb');

const StoreModel = require('../models/storeModel');

const message = 'Wrong id format';

const requestDataIsValid = (name, quantity) => {
  const requiredNonEmptyString = Joi.string().not().empty().required();
  const requiredNonEmptyNumber = Joi.number().not().empty().required();
  const minLengthNameString = 5;
  const minValueQuantityNumber = 1;

  const erro =  Joi.object({
    name: requiredNonEmptyString.min(minLengthNameString),
    quantity: requiredNonEmptyNumber.integer().min(minValueQuantityNumber),
  }).validate({ name, quantity });
  // console.log('store', erro);
  return erro;
};

const create = async (name, quantity) => {
  const { error } = requestDataIsValid(name, quantity);
  if (error) return error;
  const existingProduct = await StoreModel.findByName(name);
  if(existingProduct) return { message: 'Product already exists'};

  return await StoreModel.create(name, quantity);
};

const getAll = async () => {
  const products = await StoreModel.getAll();
  return products;
};

const findById = async (id) => {
  if(!ObjectId.isValid(id)) return { message };
  const product = await StoreModel.findById(id);
  if (!product) return { message };
  return product;
};

const updateById = async (id, name, quantity) => {
  if(!ObjectId.isValid(id)) return { message };
  const { error } = requestDataIsValid(name, quantity);
  if (error) return error;
  const { modifiedCount } = await StoreModel.updateById(id, name, quantity);
  return { modifiedCount };
};

const deleteById = async (id) => {
  if(!ObjectId.isValid(id)) return { message };
  const product = await StoreModel.deleteById(id);
  if (!product) return { message };
  return product;
};

module.exports = {
  create, getAll, findById, updateById, deleteById
};
