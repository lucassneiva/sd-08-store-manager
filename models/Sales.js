const connection = require('./connect');
const { ObjectId } = require('mongodb');

const add = async (itensSold) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => result.ops[0]);
};

const getAll = async () => {
  return connection().then((db) => db.collection('sales').find().toArray());
};

const getById = async (id) => {
  const sales = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  return sales;
};

const updateById = async (id, updatedSale) => {
  return connection().then((db) =>
    db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: updatedSale } }),
  );
};

const deleteById = async (id) => {
  const sales = await connection()
    .then((db) => db.collection('sales').deleteOne({_id: ObjectId(id)}));
  return sales;
};

module.exports = {
  add,
  getAll,
  getById,
  updateById,
  deleteById,
};
