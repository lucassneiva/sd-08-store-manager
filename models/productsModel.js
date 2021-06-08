const connection = require('./connection');

const insert = async (name, quantity) => 
  await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ id: result.insertedId, name, quantity }));

module.exports = {
  insert
};
