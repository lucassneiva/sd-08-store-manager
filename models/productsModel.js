const { ObjectID, ObjectId } = require('bson');
const connect = require('./mongoConnection');

collection = 'products';

const getProductByName = async (name) => {
  return connect().then((db) => db.collection(collection).find({ name }).toArray());
};

const getProducts = async () => {
  return connect().then((db) => db.collection(collection).find().toArray());
};

const getProductById = async (id) => {
  return connect()
    .then((db) => db.collection(collection).findOne({ _id: ObjectId(id) }));
};

const createProduct = async (name, quantity) => connect()
  .then((db) => db.collection(collection).insertOne({name, quantity}))
  .then((result) => result.ops[0]);

const validateId = (id) => ObjectID.isValid(id);

const editProduct = async (id, name, quantity) => {
  return connect()
    .then((db) => db.collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity }}));
};

module.exports = {
  createProduct,
  getProductByName,
  getProducts,
  getProductById,
  validateId,
  editProduct
};