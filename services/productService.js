const modelProduct = require('../models/productModel');
const schema = require('../schema/product');
const resolveRequest = require('../schema/resolveRequest');
const { ObjectId } = require('mongodb');

const productCreate = async (newProduct) => {
  const isValid = schema(newProduct);
  if (isValid.error) return resolveRequest(isValid);
  const productExists = await modelProduct.getByKey({
    name: newProduct.name 
  });
  if (productExists) {
    return resolveRequest('product_exists');
  }
  const newId = await modelProduct.create(newProduct);
  isValid.value._id = newId._id;
  return resolveRequest(isValid);
};

const getById = async (id) => {
  const result = await modelProduct.getByKey({ '_id': new ObjectId(id) });
  if (result) return resolveRequest({ ok: true, result });
  return resolveRequest('invalid_id');
};

const getAll = async () => {
  const result = await modelProduct.getAll();
  if (result) return resolveRequest({ all: true, result });
  return resolveRequest('invalid_id');
};

module.exports = {
  productCreate,
  getById,
  getAll,
};
