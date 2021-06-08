const { General } = require('../models');

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

const insertOne = async (arr) => {
  for (const sale of arr) {
    const isThereAProduct = await General.findById('products', sale.productId);
    if (!isThereAProduct) return { error: {
      code: 'unprocessable_entity', message: 'Wrong product ID or invalid ' } };
  }
  const insertedId = await General.insertOne(COLLECTION_NAME, { itensSold: arr });
  if (!insertedId) return { error: {
    code: 'unprocessable_entity', message: `${NAME_SINGULAR} already exists` } };
  return { result: { _id: insertedId, itensSold: arr } };
};

const deleteById = async (id) => {
  const resp = await General.deleteById(COLLECTION_NAME, id);
  if (!resp) return { error: {
    code: 'not_found', message: 'not_found message delete' } };
  return { result: {
    message: `The ${NAME_SINGULAR} with id = ${id} was deleted successfully` } };
};

const updateById = async (id, arr) => {
  const resp = await General.updateById(COLLECTION_NAME, id, { itensSold: arr });
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
