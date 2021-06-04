const { ObjectId } = require('mongodb');
const connection = require('../connection/connection');

const NAME_COLLECTION = 'sales';

const addSales = async (itensSold) => {
  try {
    const db = await connection();
    return await db
      .collection(NAME_COLLECTION)
      .insertOne(itensSold);
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

module.exports = {
  addSales,
};