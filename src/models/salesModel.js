const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const getAll = async () => {
  return await connection()
    .then(db => db.collection('sales').find().toArray())
    .then((sales) => ({ sales }));
};


const create = async (items) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: items }))
  .then((result) => (result.ops[0]));

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection()
    .then((db) => db.collection('sales')
      .findOne(new ObjectId(id)));

  if (!result) return null;
  return result;

};

const update = async (id, items) => {
  if (!ObjectId.isValid(id)) return null;

  const updateSale = await connection()
    .then((db) => db.collection('sales').updateOne({
      _id: ObjectId(id)
    }, {
      $set: { itensSold: items }
    })
      .then((result) => ({ _id: result.insertedId, _id: id, itensSold: items }))
    );

  if (!updateSale) return null;
  return updateSale;
};

const exclude = async(id)=>{
  return await connection().then(db => db.collection('sales').deleteOne(
    { _id: ObjectId(id) }
  ));
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  exclude,
};
