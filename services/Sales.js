const { General } = require('../models');

const COLLECTION_NAME = 'sales';
const NAME_SINGULAR = 'Sale';

const getAll = async () => {
  const examples = await General.getAll(COLLECTION_NAME);
  return { result: examples };
};

const findById = async (id) => {
  const example = await General.findById(COLLECTION_NAME, id);
  if (!example) return { error: {
    code: 'not_found', message: 'not_found message find' } };
  return { result: example };
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

const updateById = async (id, obj) => {
  const resp = await General.updateById(COLLECTION_NAME, id, obj);
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
