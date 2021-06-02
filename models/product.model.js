const { ObjectId } = require('mongodb');
const { RESPONSE } = require('../config/constant/returnMessage');
const { connect } = require('./config/mongodb.config');

exports.getAll = async () => {
  const products = await connect().then((db) => db.collection('products')
    .find().toArray());
  return {
    products,
  };
};

exports.getById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error(RESPONSE.ID_INVALID);
  return connect().then((db) => db.collection('products').findOne(ObjectId(id)));
};

exports.existById = async (id) => {
  const exist = await connect().then((db) => db.collection('products')
    .findOne(ObjectId(id)));
  return !!exist;
};

exports.existByName = async (name) => {
  if (!name) return null;
  const exist = await connect().then((db) => db.collection('products')
    .findOne({ name }));
  return !!exist;
};

exports.add = async (entry) =>
  connect().then(async (db) => {
    const product = await db.collection('products').insertOne(entry);

    return product.ops[0];
  });

exports.update = async (id, entry) =>
  connect().then(async (db) => {
    await db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: entry });

    return { id, ...entry };
  });

exports.exclude = async (id) => {
  connect().then(async (db) => db.collection('products')
    .deleteOne({ _id: ObjectId(id) }));
};
