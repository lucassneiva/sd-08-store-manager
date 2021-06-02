const mongoConnection = require('./mongoConnection');

const create = async (products) => {
  const salesCollection = await mongoConnection()
    .then((db) => db.collection('sales'));

  const sale = await salesCollection
    .insertOne({ itensSold: products});

  return sale.ops[0];
};

module.exports = {
  create,
};
