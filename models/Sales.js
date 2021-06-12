const { ObjectId } = require('bson');
const connection = require('./connection');

const create = async (products) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({itensSold: products})
      .then(result => result.ops[0]));
};

const searchById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id))
      .then(result => result));
};

const updateById = async (id, productId, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection('sales')
      .findOneAndUpdate(
        { _id: new ObjectId(id),  'itensSold.productId': `${productId}` },
        { $set: {'itensSold.$.quantity': quantity } },
        { returnOriginal: false })
      .then(result => result.value));
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const saleId = new ObjectId(id);
  return connection()
    .then((db) => db.collection('sales').findOneAndDelete({_id: saleId})
      .then(result => result));
};

const getAll = async () => {
  return connection()
    .then((db) => db.collection('sales').find().toArray()
      .then(result => result));
};

module.exports = {
  create,
  searchById,
  deleteById,
  updateById,
  getAll,
};
