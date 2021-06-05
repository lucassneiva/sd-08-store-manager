const getCollections = require('./connections');
const { ObjectId } = require('mongodb');

const getAll = async () =>
  getCollections('sales').then(db => db.find().toArray());

const getById = async(id) => {
  if (!ObjectId.isValid(id)) return;

  return getCollections('sales').then((db) => db.findOne(ObjectId(id)));
};

const create = async (productId, quantity) => {
  const sale = await getCollections('sales').then(db =>
    db.insertOne({ productId, quantity })
  );
  return { _id: sale.insertedId, itenSold: [{ productId, quantity}] };
};

module.exports = {
  getAll,
  getById,
  create,
};
