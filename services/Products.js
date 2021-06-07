const { General } = require('../models');

const COLLECTION_NAME = 'products';
const RESOURCE_NAME_SINGULAR = 'fill it up';

const getAll = async () => {
  const examples = await General.getAll(COLLECTION_NAME);
  return { result: examples };
};

const findById = async (id) => {
  const example = await General.findById(COLLECTION_NAME, id);
  if (!example) return { error: { code: 'not_found', message: 'not_found message find' } };
  return { result: example };
};

const insertOne = async (obj) => {
  const insertedId = await General.insertOne(COLLECTION_NAME, obj);
  if (!insertedId) return { error: { code: 'already_exists', message: 'already_exists message insert' } };
  return { result: { _id: insertedId, ...obj } };
};

const deleteById = async (id) => {
  const resp = await General.deleteById(COLLECTION_NAME, id);
  if (!resp) return { error: { code: 'not_found', message: 'not_found message delete' } };
  return { result: { message: `The ${RESOURCE_NAME_SINGULAR} with id = ${id} was deleted successfully` } };
};

const updateById = async (id, obj) => {
  const resp = await General.updateById(COLLECTION_NAME, id, obj);
  if (!resp) return { error: { code: 'not_found', message: 'not_found message update' } };
  return await findById(id);
};

module.exports = {
  getAll,
  findById,
  insertOne,
  deleteById,
  updateById,
};
