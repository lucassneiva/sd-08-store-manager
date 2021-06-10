const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const getAllSales = async () =>
  connection().then((db) => db.collection('sales').find().toArray());

const addSales = async (sales) =>
  connection().then(async (db) => {
    const { insertedId } = await db
      .collection('sales')
      .insertOne({ itensSold: sales });
    return { _id: insertedId , itensSold: sales};
  });

const getSaleById = async (id) => {
  if(!ObjectId.isValid(id)) return null;
  
  return connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const updateSale = async (id, productId, quantity) =>
  connection().then( async (db) => {
    await db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { productId, quantity }});
    return { _id: id, itensSold: productId, quantity };
  });

const excludeSale = async (id) => {
  if(!ObjectId.isValid(id)) return null;
    
  return connection().then((db) => {
    return db.collection('sales').deleteOne({ _id: ObjectId(id) });
  });
};

module.exports = {
  getAllSales,
  addSales,
  getSaleById,
  updateSale,
  excludeSale
};