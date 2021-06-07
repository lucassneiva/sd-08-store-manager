const getCollections = require('./connections');
const { ObjectId } = require('mongodb');

const getAll = async () =>
  getCollections('sales').then(db => db.find().toArray());

const getById = async(id) => {
  if (!ObjectId.isValid(id)) return;

  return getCollections('sales').then((db) => db.findOne({ _id: ObjectId(id) }));
};

const create = async (products) => {
  const sale = await getCollections('sales').then(db =>
    db.insertOne({ itensSold: products })
  );
  return { _id: sale.insertedId, itensSold: products };
};

const update = async (id, productId, quantity) => {
  if (!ObjectId.isValid(id)) return;

  const sale = await getCollections('sales').then(db =>
    db.updateOne({ _id: ObjectId(id) }, { $set: { productId, quantity } })
  );
  return { _id: sale.insertedId, productId, quantity };
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return;
  const sale = await getCollections('sales').then(db =>
    db.deleteOne({ _id: ObjectId(id) })
  );
  return { _id: sale.insertedId };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
