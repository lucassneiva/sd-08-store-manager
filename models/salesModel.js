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

  const sale = await salesCollection.findOne(new ObjectId(id));
  return sale;
};

const deleteSale = async (id) => {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  const saleToDelete = await salesCollection.findOne(new ObjectId(id));
  await salesCollection.deleteOne({ _id: ObjectId(id)});
  return saleToDelete;
};

const updateSale = async (id, sale) => {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  await salesCollection.updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale }});
  const updated = { _id: id, itensSold: sale };
  return updated;
};


module.exports = {
  createSale,
  listAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};
