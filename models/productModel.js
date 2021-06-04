const getCollections = require('./connections');
const { ObjectId } = require('mongodb');

const getAll = async () =>
  getCollections('products').then(db => db.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return getCollections('products').then(db => db.findOne(ObjectId(id)));
};

const create = async (name, quantity) => {
  const product = await getCollections('products').then(db =>
    db.insertOne({ name, quantity })
  );
  return { _id: product.insertedId, name, quantity };
};

module.exports = {
  getAll,
  create,
  getById,
};
