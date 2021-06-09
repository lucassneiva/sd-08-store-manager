const connection = require('./connection');
const { ObjectId } = require('mongodb');


const create = async(array) => {
  return connection()
    .then((db) => db.collection('sales').insertMany(array))
    .then((data) => data.ops);
};

const getAll = async () => {
  return connection()
    .then((db) => db.collection('sales').find().toArray());
};

const getById = (id) => {
  return connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));
};

const update = async (id, array) => {
  return connection()
    .then((db) => db.collection('sales')
      .updateOne({_id: new ObjectId(id)}, {$set: { itensSold: array} }));
};

const deleteSale = async (id) => 
  connection()
    .then((db) => db.collection('sales')
      .deleteOne({_id: new ObjectId(id)}));

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteSale
};
