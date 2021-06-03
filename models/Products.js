const connection = require('./connection');

const create = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity})
      .then(result => result.ops[0]));
};

const searchByName = async (name) => {
  return connection()
    .then((db) => db.collection('products').findOne({ name: name})
      .then(result => result));
};

module.exports = {
  create,
  searchByName,
};
