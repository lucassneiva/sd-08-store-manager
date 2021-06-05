const getCollections = require('./connections');
const { ObjectId } = require('mongodb');
// const { get } = require('../controllers/productController');

const getAll = async () =>
  getCollections('products').then(db => db.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return;
  return getCollections('products').then(db => db.findOne(ObjectId(id)));
};

const create = async (name, quantity) => {
  const product = await getCollections('products').then(db =>
    db.insertOne({ name, quantity })
  );
  return { _id: product.insertedId, name, quantity };
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return;
  const product = await getCollections('products').then(db =>
    db.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
  );
  return { _id: product.insertedId, name, quantity };
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return;
  const product = await getCollections('products').then(db =>
    db.deleteOne({ _id: ObjectId(id) })
  );
  return { _id: product.insertedId };
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove,
};
