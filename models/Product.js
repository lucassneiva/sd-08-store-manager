const connection = require('./connection');
const { ObjectId } = require('mongodb');

const PRODUCTS_COLLECTION = 'products';

const create = async (newProduct) => {
  const conn = await connection();
  const { insertedId } = await conn.collection(PRODUCTS_COLLECTION).insertOne(newProduct);
  return {
    _id: insertedId,
    ...newProduct,
  };
};

const findByName = async (name) => {
  const conn = await connection();
  const result = await conn.collection(PRODUCTS_COLLECTION).findOne({ name });
  return result;
};

const getAll = async () => {
  const conn = await connection();
  return conn.collection(PRODUCTS_COLLECTION).find().toArray();
};

const findyById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const conn = await connection();
  return conn.collection(PRODUCTS_COLLECTION).findOne(ObjectId(id));
};

const update = async (id, product) => {
  if (!(await findyById(id))) return null;
  const conn = await connection();
  return conn
    .collection(PRODUCTS_COLLECTION)
    .updateOne({ _id: ObjectId(id) }, { $set: product });
};

const remove = async (id) => {
  const findId = await findyById(id);
  if (!findId) return null;
  await (await connection())
    .collection(PRODUCTS_COLLECTION)
    .deleteOne({ _id: ObjectId(id) });
  return findId;
};

module.exports = {
  create,
  findByName,
  getAll,
  findyById,
  update,
  remove,
};
