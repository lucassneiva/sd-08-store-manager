const { ObjectId } = require('mongodb');
const connection = require('./connect');

const addSale = async (saleInfo) => {
  const db = await connection();
  const { insertedId } = await db
    .collection('sales')
    .insertOne({ itensSold: saleInfo });
  return {
    _id: insertedId,
    itensSold: saleInfo,
  };
};

const getAll = async () => {
  const db = await connection();
  return db.collection('sales').find().toArray();
};
  
const getAllById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  const sales = await db.collection('sales').findOne(ObjectId(id));

  return sales;
};

module.exports = {
  addSale,
  getAll,
  getAllById,
}; 