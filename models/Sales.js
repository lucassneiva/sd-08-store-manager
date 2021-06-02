const connection = require('./connection');
const { ObjectId } = require('mongodb');
const saveMe = require('../utils/saveMe');

const create = saveMe(async (itensSold) => {
  const db = await connection();
  const { insertedId } = await db.collection('sales').insertOne({ itensSold });
  return { _id: insertedId, itensSold };
});

const getAll = saveMe(async () => {
  const db = await connection();
  const result = await db.collection('sales').find().toArray();
  return result;
});

const getById = saveMe(async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const db = await connection();
  const result = await db.collection('sales').findOne(ObjectId(id));
  return result;
});

const edit = saveMe(async (id, updatedSale) => {
  if (!ObjectId.isValid(id)) return false;
  const db = await connection();
  await db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: updatedSale } });
  return { _id: id, itensSold: updatedSale };
});

module.exports = {
  create,
  getAll,
  getById,
  edit
};
