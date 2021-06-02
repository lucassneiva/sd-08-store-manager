const connection = require('./connection');
const { ObjectId } = require('mongodb');

const SALES = 'sales';

const create = async (sale) => {
  try {
    const db = await connection();
    const { insertedId } = await db.collection(SALES).insertOne({ itensSold: [...sale] });
    return insertedId;
  } catch (err) {
    return null;
  }
};

const getAll = async () => {
  try {
    const db = await connection();
    const result = await db.collection(SALES).find().toArray();
    return ({ sales: [...result] });
  } catch (err) {
    return null;
  }
};

const findById = async (saleId) => {
  try {
    const db = await connection();
    const result = await db.collection(SALES).findOne({ _id: ObjectId(saleId) });
    return result;
  } catch (err) {
    return null;
  }
};

const updateOne = async (saleId, changes) => {
  try {
    const db = await connection();
    await db.collection(SALES).update({ _id: ObjectId(saleId) }, changes);
    return true;
  } catch (err) {
    return null;
  }
};

module.exports = {
  create,
  getAll,
  findById,
  updateOne,
};
