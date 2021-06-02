const { ObjectId } = require('mongodb');
const connection = require('./connection');
const collectionName = 'sales';

const insertSale = async (salesArray) =>
  connection()
    .then((db) => db.collection(collectionName).insertOne({ itensSold: salesArray }))
    .then((result) => ({ _id: result.insertedId, itensSold: salesArray }));

const getAllSales = async () =>
  connection()
    .then((db) => db.collection(collectionName).find().toArray())
    .then((sales) => sales);

const getSaleById = async (id) => {
  return connection()
    .then((db) => db.collection(collectionName).findOne(ObjectId(id)))
    .then((sale) => sale);
};

const updateSale = async (id, productId, quantity) =>
  connection()
    .then((db) => db.collection(collectionName)
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: { productId, quantity } } }),
    )
    .then((sale) => sale.matchedCount);

const deleteSale = async (id) => {
  const saleDeleted = await getSaleById(id);
  connection().then((db) => db.collection(collectionName).deleteOne({_id: ObjectId(id)}));
  return saleDeleted;
};

module.exports = {
  insertSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale
};
