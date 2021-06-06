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

async function updateSale(req){
  const [info] = req.body;
  const {id} = req.params;
  if(!ObjectId.isValid(id)) return null;
  await connection().then((db) => db.collection('sales').updateOne(
    {_id: ObjectId(id)},
    {$set: {itensSold: [info]}}
  ));
  return {
    _id: id,
    itensSold: [info]
  };
}

async function deleteSale(id){
  if(!ObjectId.isValid(id)) return null;
  const data = await connection().then((db) =>
    db.collection('sales').findOne(new ObjectId(id)));
  if(!data) return null;
  await connection().then((db) =>
    db.collection('sales').deleteOne(
      {_id: ObjectId(id)}
    ));
  return data;
}

module.exports = {
  addSale, getAll, updateSale, deleteSale
};
