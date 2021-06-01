const mongodb = require('mongodb');
const connection = require('./connection');
const { ObjectId } = require('mongodb');

const addSalesProduct = async (sales) => {
  const product = await connection()
    .then((db) => db.collection('sales').insertOne({ sales }));
  return { 
    _id: product.insertedId,
    itensSold: sales,
  };
};

module.exports = {
  addSalesProduct
};
