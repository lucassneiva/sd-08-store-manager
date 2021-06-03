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
    const sale = await db.collection('sales').findOne(ObjectId(id));
    return sale;
  } catch (error) {
    return null;
  }
};

const updateSalesModel = async (id, sales) => {
  try {
    const db = await connection();
    await db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, sales );
    return true;
  } catch (error) {
    return null;
  }
};

module.exports = {
  createSalesModel,
  getAllSalesModel,
  getByIdSalesModel,
  updateSalesModel,
};
