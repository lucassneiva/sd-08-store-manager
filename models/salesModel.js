const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSalesModel = async (sales) => {
  try {
    const db = await connection();
    const { insertedId } = await db.collection('sales')
      .insertOne({ itemsSold: [...sales] });
    return insertedId;
  } catch (error) {
    return 'not created';
  }
};

module.exports = {
  createSalesModel,
};
