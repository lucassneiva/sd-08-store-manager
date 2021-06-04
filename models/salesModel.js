const { ObjectId } = require('mongodb');
const connection = require('../connection/connection');

const NAME_COLLECTION = 'sales';

const addSales = async (itensSold) => {
  try {
    const db = await connection();
    return await db
      .collection(NAME_COLLECTION)
      .insertOne({ itensSold });
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const findAllSales = async () => {
  try {
    const db = await connection();
    return await db.collection(NAME_COLLECTION).find().toArray();
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const findSalesById = async (id) => {
  try {
    console.log(id);
    console.log(ObjectId(id));
    console.log(new ObjectId(id));
    const sales = await connection().then((db) => {
      return db
        .collection(NAME_COLLECTION)
        .findOne(new ObjectId(id));
    });
    console.log(sales);
    if (!sales) return null;
    return sales;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

module.exports = {
  addSales,
  findAllSales,
  findSalesById,
};