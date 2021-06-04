const { ObjectId } = require('mongodb');
const { RESPONSE } = require('../config/constant/returnMessage');
const { connect } = require('./config/mongodb.config');

exports.getAll = async () => {
  const sales = await connect().then((db) => db.collection('sales')
    .find().toArray());
  return {
    sales,
  };
};

exports.getById = async (id) => {
  return connect().then((db) => db.collection('sales')
    .findOne(ObjectId(id)));
};

exports.existById = async (id) => {
  const exist = await connect().then((db) => db.collection('sales')
    .findOne(ObjectId(id)));
  return !!exist;
};

exports.existByName = async (name) => {
  if (!name) return null;
  const exist = await connect().then((db) => db.collection('sales')
    .findOne({ name }));
  return !!exist;
};

exports.add = async (entry) =>
  connect().then(async (db) => {
    await db.collection('sales')
      .insertOne({ itensSold: entry });
    return { itensSold: entry };
  });

exports.update = async (id, entry) =>
  connect().then(async (db) => {
    await db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: entry });
    return { id, ...entry };
  });

exports.exclude = async (id) => {
  connect().then(async (db) => db.collection('sales')
    .deleteOne({ _id: ObjectId(id) }));
};
