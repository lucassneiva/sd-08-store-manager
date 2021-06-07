const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (sale) => {
  const db = await connection();
  const result = await db.collection('sales').insertOne(sale);
  return { _id: result.insertedId, ...sale };
};

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('sales').find().toArray();
  return result;
};

const getById = async (id) => {
  const db = await connection();
  const result = await db.collection('sales').findOne(new ObjectId(id));
  return result;
};

const update = async (id, newData) => {
  const db = await connection();
  await db
    .collection('sales')
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { 'itensSold.$[elem].quantity': newData.quantity } },
      { arrayFilters: [{ 'elem.productId': newData.productId }] },
    );
  return await getById(id);
};

const remove = async (id) => {
  const db = await connection();
  const result = await db.collection('sales').findOneAndDelete({ _id: new ObjectId(id) });
  return result.value;
};

module.exports = { create, getAll, getById, update, remove };
