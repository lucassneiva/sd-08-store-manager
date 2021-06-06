const connection = require('./connection');
const { ObjectId } = require('mongodb');

const registerSale = async (sales) => {
  try {
    return await connection().then((db) => db.collection('sales').insertOne(sales));
  } catch (error) {
    console.error(error);
  }
};

const getAllSales = async () => {
  try {
    return await connection().then((db) => db.collection('sales').find().toArray());
  } catch (error) {
    console.error(error);
  }
};

const getSalesByID = async (id) => {
  try {
    return await connection()
      .then((db) => ObjectId.isValid(id) ? db.collection('sales')
        .find({_id: ObjectId(id)}).toArray() : null);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  registerSale,
  getAllSales,
  getSalesByID
};
