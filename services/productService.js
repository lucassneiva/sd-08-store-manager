const modelProduct = require('../models/productModel');
const schema = require('../schema/product');
const { resolveRequestProduct } = require('../schema/resolveRequest');
const { ObjectId } = require('mongodb');

const productCreate = async (newProduct) => {
  const isValid = schema.validProduct(newProduct);
  if (isValid.error) return resolveRequestProduct(isValid);
  const productExists = await modelProduct.getByKey({
    name: newProduct.name 
  });
  if (productExists) {
    return resolveRequestProduct('product_exists');
  }
  const newId = await modelProduct.create(newProduct);
  isValid.value._id = newId._id;
  return resolveRequestProduct(isValid);
};

const getById = async (id) => {
  const result = await modelProduct.getByKey({ '_id': new ObjectId(id) });
  if (result) return resolveRequestProduct({ ok: true, result });
  return resolveRequestProduct('invalid_id');
};

const getAll = async () => {
  const result = await modelProduct.getAll();
  if (result) return resolveRequestProduct({ all: true, result });
  return resolveRequestProduct('invalid_id');
};

const update = async (product) => {
  const { id, name, quantity } = product;
  const isValid = schema.validProduct({ name, quantity });
  if (isValid.error) return resolveRequestProduct(isValid);
  const productExist = await modelProduct.getByKey({ _id: new ObjectId(id) });
  if (!productExist) return resolveRequestProduct('invalid_id');
  const resultUpdate = await modelProduct.update(
    { _id: new ObjectId(id), name, quantity }
  );
  if (resultUpdate) return resolveRequestProduct({ ok: true, result: resultUpdate });
  return resolveRequestProduct('invalid_id');
};

const deleteProduct = async (id) => {
  const product_exists = await modelProduct.getByKey({ _id: new ObjectId(id) });
  if(!product_exists) return resolveRequestProduct('invalid_id');
  const result = await modelProduct.deleteProduct({ _id: ObjectId(id) });
  if(!result.deletedCount) return resolveRequestProduct('invalid_id');
  return resolveRequestProduct({ ok: true, result:  product_exists });
};

module.exports = {
  productCreate,
  getById,
  getAll,
  update,
  deleteProduct,
};
