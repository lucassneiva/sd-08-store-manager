const connect = require('../config/conn');
const { ObjectId } = require('mongodb');

const getAll = async () => connect()
  .then((db) => db.collection('sales').find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connect().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const add = async (sales) => connect().then(async (db) => {
  const sale = await db.collection('sales').insertOne({ itensSold: [...sales] });
  return sale.ops[0];
});

const update = async (id, itensSold) =>
  connect().then(async (db) => {
  	const sales = await db.collection('sales')
  		.updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });

    return { _id: id, itensSold };
  });

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connect().then(async (db) =>
    db.collection('sales').deleteOne({ _id: ObjectId(id) })
  );
};

module.exports = { add, getAll, getById, update, exclude };