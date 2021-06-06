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

const listAllSales = async () => {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  const salesList = await salesCollection.find().toArray();
  return salesList;
};

const getSaleById = async(id) => {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  const sale = await salesCollection.findOne({ _id: ObjectId(id) });
  return sale;
};


module.exports = {
  createSale,
  listAllSales,
  getSaleById,
};
