const connect = require('../config/conn');
const { ObjectId } = require('mongodb');

const getAll = async () => connect()
  .then((db) => db.collection('products').find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connect().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const add = async (name, quantity) => connect().then(async (db) => {
  const product = await db.collection('products').insertOne({
    name: name, quantity: quantity
  });
  return product.ops[0];
});

const update = async (id, name, quantity) =>
  connect().then(async (db) => {
  	const product = await db.collection('products')
  		.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

    return { _id: id, name, quantity };
  });

const exclude = async (id) =>
  connect().then(async (db) =>
	  db.collection('products').deleteOne({ _id: ObjectId(id) })
  );

module.exports = { getAll, add, getById, update, exclude };