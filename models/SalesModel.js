const connection = require('./connection');

const create = async(array) => {
  return connection()
    .then((db) => db.collection('sales').insertMany(array))
    .then((data) => data.ops);
};

module.exports = {
  create,
};
