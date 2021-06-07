const connection = require('./connection');

const { ObjectId } = require('mongodb');

const create = async (name, quantity) => 
  connection()
    .then((db) => db.collection('products').insertOne({name, quantity}))
    .then((data) => {
      const [result] = data.ops;
      return result;
    });

const getAll = () => {
  return connection()
    .then((db) => db.collection('products').find().toArray())
    .then((data) => data);
};

const getById = (id) => {
  return connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));
};

const update = async (id, name, quantity) => 
  connection()
    .then((db) => db.collection('products')
      .updateOne({_id: new ObjectId(id)}, { $set: {name: name, quantity: quantity}}));

module.exports = {
  create,
  getAll,
  getById,
  update
};
