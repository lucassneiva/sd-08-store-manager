const { General } = require('../models');
const { updateProducts } = require('../utils');

const COLLECTION_NAME = 'sales';
const NAME_SINGULAR = 'Sale';

const getAll = async () => {
  const resources = await General.getAll(COLLECTION_NAME);
  return { result: { sales: resources } };
};

const findById = async (id) => {
  const resource = await General.findById(COLLECTION_NAME, id);
  if (!resource) return { error: {
    code: 'not_found', message: `${NAME_SINGULAR} not found` } };
  return { result: resource };
};

const insertOne = async (itensSold) => {
  const productsToUpdate = [];
  for (const product of itensSold) {
    const existingProduct = await General.findById('products', product.productId);
    if (!existingProduct) return { error: {
      code: 'unprocessable_entity', message: 'Wrong product ID or invalid ' } };
    productsToUpdate.push(existingProduct);
  }
  const insertedId = await General.insertOne(COLLECTION_NAME, { itensSold });
  if (!insertedId) return { error: {
    code: 'unprocessable_entity', message: `${NAME_SINGULAR} already exists` } };
  
  let upProducts;
  try {
    const { result, error } = updateProducts('dec', productsToUpdate, itensSold);
    if (error) return { error };
    upProducts = result;
  } catch (err) {
    return err;
  }

  for (const upProduct of upProducts) {
    const { _id, ...prod } = upProduct;
    await General.updateById('products', _id, prod);
  }

  return { result: { _id: insertedId, itensSold } };
};

const deleteById = async (id) => {
  const { result, error } = await findById(id);
  if (error) return { error: {
    code: 'unprocessable_entity', message: 'Wrong sale ID format' } };
    
  const { itensSold } = result;
  const productsToUpdate = [];
  for (const product of itensSold) {
    const existingProduct = await General.findById('products', product.productId);
    productsToUpdate.push(existingProduct);
  }

  const {
    result: upProducts,
    error: upError
  } = updateProducts('inc', productsToUpdate, itensSold);
  if (upError) return { error: upError };

  for (const upProduct of upProducts) {
    const { _id, ...prod } = upProduct;
    await General.updateById('products', _id, prod);
  }
  
  await General.deleteById(COLLECTION_NAME, id);
  return { result: {
    message: `The ${NAME_SINGULAR} with id = ${id} was deleted successfully` } };
};

const updateById = async (id, itensSold) => {
  const resp = await General.updateById(COLLECTION_NAME, id, { itensSold });
  if (!resp) return { error: {
    code: 'not_found', message: 'not_found message update' } };
  return await findById(id);
};

module.exports = {
  getAll,
  findById,
  insertOne,
  deleteById,
  updateById,
};
