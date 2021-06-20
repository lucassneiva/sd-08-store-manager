const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (itensSold) => {
 
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({itensSold}));
  return { _id: insertedId, itensSold };
};

const findAll = async () => {
  const sales = await connection()
    .then((db) => db.collection('sales').find().toArray());
  if (!sales) return null;
  return {sales};
};
const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const sale = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  if (!sale) return null;
  return sale;
};
const updateSale = async (sale) => {
  const { id, itensSold } = sale;
  
  if (!ObjectId.isValid(id)) return null;
  
  await connection()
    .then((db) => db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));
  return { _id: id, itensSold };
};
  

module.exports={
  createSale,
  findAll,
  findById,
  updateSale
  
};