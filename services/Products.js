const { General } = require('../models');

const COLLECTION_NAME = 'products';
const NAME_SINGULAR = 'Product';

const getAll = async () => {
  const resources = await General.getAll(COLLECTION_NAME);
  return { result: { products: resources } };
};

const findById = async (id) => {
  const example = await General.findById(COLLECTION_NAME, id);
  if (!example) return { error: {
    code: 'unprocessable_entity', message: 'Wrong id format' } };
  return { result: example };
};

const insertOne = async (obj) => {
  const [matchedName] = await General.findWith(COLLECTION_NAME, { name: obj.name });
  const insertedId = await General.insertOne(COLLECTION_NAME, obj);
  if (!insertedId || matchedName) return { error: {
    code: 'unprocessable_entity', message: `${NAME_SINGULAR} already exists` } };
  return { result: { _id: insertedId, ...obj } };
};

const deleteById = async (id) => {
  const resp = await General.deleteById(COLLECTION_NAME, id);
  if (!resp) return { error: {
    code: 'unprocessable_entity', message: 'Wrong id format' } };
  return { result: {
    message: `The ${NAME_SINGULAR} with id = ${id} was deleted successfully` } };
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
