const connection = require('./connection');

const { ObjectId } = require('mongodb');

const getAll = async () => {
  return connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((salesList) => salesList.map(({_id, itensSold}) => ({ _id, itensSold })));
};

const newSale = async (productsArray) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: productsArray }))
    .then((item) => ({ _id: item.insertedId, itensSold: productsArray }));
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)))
    .then((item) => ({ _id: id, itensSold: item.itensSold }))
    .catch((err) => console.log(err));
};

const updateSale = async (id, modifiedSale) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('sales')
      .updateOne({ id: ObjectId(id) }, { $set: { itensSold: modifiedSale } }))
    .then(() => ({ _id: id, itensSold: modifiedSale }));
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  newSale,
  findById,
  updateSale,
  deleteSale,
};
