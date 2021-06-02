const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (sales) => {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  const { insertedId } = await salesCollection.insertOne({
    itensSold: sales
  });

  return {
    _id: insertedId,
    itensSold: sales,
  };
};


module.exports = {
  createSale,
};
