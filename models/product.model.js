const { ObjectId } = require('mongodb');
const { connect } = require('./config/mongodb.config');

exports.getAll = async () => connect().then((db) => db.collection('products')
  .find().toArray());

exports.getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connect().then((db) => db.collection('products').findOne(ObjectId(id)));
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

exports.update = async (entry) =>
  connect().then(async (db) => {
    const product = await db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: entry });

    return { _id: id, name, age };
  });

exports.exclude = async (id) =>
  connect().then(async (db) => db.collection('products')
    .deleteOne({ _id: ObjectId(id) }));
