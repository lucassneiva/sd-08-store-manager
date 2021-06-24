const { ObjectId } = require('mongodb');
const connect = require('./connection');

const findByName = async (name) => {
  const connection = connect();
  const product = await connection.collection('products').findOne({ name });

  return Boolean(product);
};

const create = async (name, quantity) => {
  const connection = connect();
  const newProduct = await connection.collection('products').insertOne({
    name,
    quantity
  });

  return newProduct.ops[0];
};

const list = async (_id) => {
  const connection = connect();
  if (_id) {
    try {
      const find = await connection.collection('products').findOne({
        _id: ObjectId(_id)
      });
      return find;
    } catch (err) {
      return;
    }
  }
  const productsList = await connection.collection('products').find().toArray();

  return productsList;
};

module.exports = {
  findByName,
  create,
  list
};
