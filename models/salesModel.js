const { ObjectId } = require('bson');
const connection = require('./connection');

const addNewSale = async (sale) => {
  const db = await connection();
  const { insertedId } = await db.collection('sales')
    .insertOne({ itensSold: sale });
  return {
    _id: insertedId,
    itensSold: sale,
  };
};

const getAllSales = async () => {
  const db = await connection();
  const result = await db.collection('sales').find().toArray();
  return result;
};

const getSaleById = async (id) => {
  const db = await connection();
  const result = await db.collection('sales').findOne({ _id: new ObjectId(id) });
  return result;
};

const updateSaleById = async (id, newSaleInfo) => {
  const db = await connection();
  const result = await db.collection('sales')
    .updateOne({ _id: new ObjectId(id) }, { $set: { itensSold: newSaleInfo } });
  if (!result.matchedCount) return null;
  return {
    _id: id,
    itensSold: newSaleInfo,
  };
};

const deleteSaleById = async (id) => {
  const db = await connection();
  await db.collection('sales')
    .deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  addNewSale,
  getAllSales,
  getSaleById,
  updateSaleById,
  deleteSaleById,
};