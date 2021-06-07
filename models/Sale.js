const { ObjectId } = require('bson');
const connection = require('./connection');

const getAll = async() => await connection().then(
  (db) => db.collection('sales').find().toArray());

const findById = async(id) => await connection().then(
  (db) => db.collection('sales').findOne(ObjectId(id)));

const register = async(sale) => {
  const { insertedId } = await connection().then(
    (db) => db.collection('sales').insertOne({ itensSold: sale } ));

  return {
    _id: insertedId,
    itensSold: sale
  };
};

const update = async(id, productId, quantity) => {
  await connection().then((db) => db.collection('sales').updateOne(
    { _id: ObjectId(id), 'itensSold.productId': `${ObjectId(productId)}` },
    { $set: { itensSold: [ quantity ] } }
  ));

  return { 
    _id: ObjectId(id),
    itensSold: [{
      productId,
      quantity
    }]
  };
};

const remove = async(id) => {
  const { value } = await connection().then(
    (db) => db.collection('sales').findOneAndDelete({ _id: ObjectId(id) }));
  return value;
};

module.exports = {
  getAll,
  findById,
  register,
  update,
  remove,
};
