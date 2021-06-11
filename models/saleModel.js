const connection = require('./mongoConnection');
const { ObjectId, ObjectID } = require('mongodb');

const getAll = async () => connection()
  .then(db => db.collection('sales').find().toArray())
  .then((sales) => ({ sales }));

const add = async (itensSold) => connection()
  .then((db) => db.collection('sales').insertOne({itensSold}))
  .then((result) => ({ _id: result.insertedId, itensSold}));

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const saleId = await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectID(id)}));

  !saleId && null;

  return saleId;
};

const update = async ( id, itensSold ) => {
  if (!ObjectId.isValid(id)) return null;

  const sale = await connection()
    .then(
      (db) =>	db
        .collection('sales')
        .updateOne({_id: ObjectId(id) }, { $set: { itensSold }
        })
        .then(() => ({ _id: id, itensSold }))
    );

  !sale && null;

  return sale;
};

const deleteSale = async (id) => await connection()
  .then(db => db.collection('sales').deleteOne({_id: ObjectId (id)}));

module.exports = {
  getAll,
  add,
  getById,
  update,
  deleteSale,
};
