const { connectionDb } = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (itensSold) => {
  try {
    const getCollection = await connectionDb()
      .then((db) => db.collection('sales'));
    const setSales = await getCollection.insertOne({ itensSold });
    return setSales.ops[0];
  } catch (err) {
    return err;
  }
};

const getAll = async () => {
  try {
    const getAllCollection = await connectionDb()
      .then((db) => db.collection('sales'))
      .then((getCollection) => getCollection.find());
    return getAllCollection.toArray();
  } catch (err) {
    return err;
  }
};

module.exports = {
  create,
  getAll,
};
