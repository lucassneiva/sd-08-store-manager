const Connection = require('../connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const db = await Connection();
  return await db.collection('products').find({}).toArray();
};

const add = async (produto) => {
  const db = await Connection();
  const result = await db.collection('products').insertOne(produto);
  return result.ops[0];
};

const getByName = async (name) => {
  const db = await Connection();
  const result = await db.collection('products').findOne({ name });
  return result;
};

const getById = async (ids) => {
  if (!ObjectId.isValid(ids)) return null;
  const db = await Connection();
  const result = await db.collection('products').findOne({_id: ObjectId(ids) });
  return result;
};

const updateById = async (ids, produto) => {
  const db = await Connection();
  await db.collection('products')
    .updateOne({ _id: ObjectId(ids) }, { $set: produto });
  const result = await getById(ids);
  return result;
};

const deleteById = async (ids) => {
  const result = await getById(ids);
  const db = await Connection();
  await db.collection('products')
    .deleteOne({ _id: ObjectId(ids) });
  return result;
};

module.exports = {
  add,
  getAll,
  getByName,
  getById,
  updateById,
  deleteById,
};
