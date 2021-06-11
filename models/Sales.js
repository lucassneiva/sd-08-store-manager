const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => await connection()
  .then((db) => db.collection('sales').find().toArray());

const getById = async (id) => {
  const saleData = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  if (!saleData) return null;
  return saleData;
};

const create = async (sale) => await connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: sale }));

const update = async (id, sale) => await connection()
  .then((db) => 
    db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale }}));

const remove = async (id) => await connection()
  .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));


module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};