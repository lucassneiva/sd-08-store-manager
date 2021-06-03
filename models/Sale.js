const connection = require('./connection');
const { ObjectId } = require('mongodb');

const SALES_COLLECTION = 'sales';

const create = async (itensSold) => {
  const conn = await connection();
  const { insertedId } = await conn.collection(SALES_COLLECTION).insertOne({ itensSold });
  return insertedId;
};

const getAll = async () => {
  const conn = await connection();
  return conn.collection(SALES_COLLECTION).find().toArray();
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const conn = await connection();
  return conn.collection(SALES_COLLECTION).findOne(ObjectId(id));
};

module.exports = {
  create,
  getAll,
  findById,
};
