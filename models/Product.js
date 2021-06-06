const connection = require('./connection');

const getAll = async() => await connection().then(
  (db) => db.collection('products').find().toArray());

const create = async(name, quantity) => {
  const { insertedId } = await connection().then(
    (db) => db.collection('products').insertOne({ name } ));

  return {
    _id: insertedId,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  create,
};
