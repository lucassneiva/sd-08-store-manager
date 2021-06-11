const connection = require('./connection');

const create = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insert({
      name,
      quantity,
    }));
};

module.exports = {
  create,
};
