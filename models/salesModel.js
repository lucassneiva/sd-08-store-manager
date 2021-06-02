const mongodb = require('mongodb');
const connection = require('./connection');
const { ObjectId } = require('mongodb');

const addSalesProduct = async (sales) => {
  const product = await connection()
    .then((db) => db.collection('sales').insertOne({itensSold: sales}));
  return { 
    _id: product.insertedId,
    itensSold: sales,
  };
};

const getAll = async () => {
  const sales = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return sales;
};

const getById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return false;
  const saleById = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return saleById;
};

const updateById = async (id, sales) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return false;
  const updateById = await db.collection('sales')
    .updateOne({ _id: ObjectId(id)}, { $set: { itensSold: sales }});
  const updatedSale = await db.collection('sales').findOne(ObjectId(id));
  return updatedSale;
};

const deleteById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return false;
  const saleById = await db.collection('sales').findOne(ObjectId(id));
  await db.collection('sales').deleteOne({ _id: ObjectId(id)});
  return saleById;
};

module.exports = {
  addSalesProduct,
  getAll,
  getById,
  updateById,
  deleteById
};
