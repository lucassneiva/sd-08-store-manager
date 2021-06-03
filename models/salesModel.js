const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSalesModel = async (sales) => {
  try {
    const db = await connection();
    const { insertedId } = await db.collection('sales')
      .insertOne({ itensSold: [...sales] });
    return insertedId;
  } catch (error) {
    return 'not created';
  }
};

const getAllSalesModel = async () => {
  try {
    const db = await connection();
    const sales = await db.collection('sales').find().toArray();
    const result = { sales: [...sales] };
    return result;
  } catch (error) {
    return error;
  }
};

const getByIdSalesModel = async (id) => {
  try {
    const db = await connection();
    const sale = await db.collection('sale').findOne(ObjectId(id));
    return sale;
  } catch (error) {
    return null;
  }
};

module.exports = {
  createSalesModel,
  getAllSalesModel,
  getByIdSalesModel,
};
