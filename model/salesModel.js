const connection = require ('../data/connection');
const { ObjectId } = require('mongodb');

async function addSale(req){
  const { body } = req;
  const data = await connection().then((db) =>
    db.collection('sales').insertOne({itensSold: body}));
  return {
    _id: data.insertedId,
    itensSold: body
  };
}

async function getAll(req){
  const { id } = req.params;
  if (!id){
    const data = await connection()
      .then((db) => db.collection('sales').find().toArray());
    return {
      sales: data
    };
  }
  if(!ObjectId.isValid(id)) return null;
  const data = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));
  return !data ? null : data;
}

module.exports = {
  addSale, getAll
};
