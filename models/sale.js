const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (items) => {
  const db = await connection();

  const otherSale = await db.collection('sales').insertOne({ itensSold: items });

  return otherSale.ops[0];
};

const getAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();

  return sales;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));

  if (!sale) return null;

  return sale;
};

const update = async (id, item) =>  {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const updateSale = await db.collection('sales')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { itensSold: item } }, 
      { returnOriginal: false}
    );

  if (!updateSale) return null;

  return updateSale.value;
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const sale = await getById(id);
  const db = await connection();
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  return sale;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById
};