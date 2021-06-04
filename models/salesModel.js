const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (sale) => {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  const { insertedId } = await salesCollection.insertOne({
    itensSold: sale
  });

  return {
    _id: insertedId,
    itensSold: sale
  };
};


module.exports = {
  createSale,
};
