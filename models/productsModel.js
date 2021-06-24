const connection = require('./connection');

const Add = async({name, quantity}) => {
  const product =  await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return product;
};

module.exports = {
  Add,
};