const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllSales = async () => {
  try {
    const db = await connection();
    const result = await db.collection('sales').find().toArray();
    return ({ sales: [...result] });
  } catch (err) {
    return null;
  }
};

const findSale = async (saleId) => {
  try {
    const db = await connection();
    const result = await db.collection('sales').findOne({ _id: ObjectId(saleId) });
    return result;
  } catch (err) {
    return null;
  }
};

const createSale = async (sale) => {
  try {
    const db = await connection();
    const { insertedId } = await db.collection('sales').insertOne({ itensSold: [...sale] });
    return insertedId;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const updateSale = async (saleId, changes) => {
  try {
    const db = await connection();
    await db.collection('sales').updateOne(
      { _id: ObjectId(saleId) }, { $set: { itensSold: [...changes] } });
    return true;
  } catch (err) {
    return null;
  }
};

const deleteSale = async (saleId) => {
  try {
    const db = await connection();
    const sale = await db.collection('sales').findOne({ _id: ObjectId(saleId) });
    await db.collection('sales').deleteOne({ _id: ObjectId(saleId) });
    return sale;
  } catch (err) {
    return null;
  }
};

module.exports = {
  getAllSales,
  findSale,
  createSale,
  updateSale,
  deleteSale,
};
