const connection = require('./mongoConnection');

const getAll = async () => connection()
  .then(db => db.collection('products').find().toArray());

const add = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({name, quantity}))
  .then((result) => ({ _id: result.insertedId, name, quantity}));

const getByName = async (name) => {

  const productName = await connection()  
    .then(db => db.collection('products').findOne({name}));

  !productName && null;

  return productName;
};

module.exports = {
  getAll,
  add,
  getByName,
};
