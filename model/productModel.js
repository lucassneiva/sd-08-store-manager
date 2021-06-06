
const { ObjectId } = require('mongodb');
const connection = require('../data/connection');

async function createProduct(name, quantity){
  const checkProduct = await connection()
    .then((db) => db.collection('products').findOne({name: name}));
  if (checkProduct) return null;
  const data = await connection().then((db) =>
    db.collection('products').insertOne({name, quantity}));
  return {
    _id: data.insertedId,
    name,
    quantity
  };
}

async function getAll(){
  const data = await connection()
    .then((db) => db.collection('products').find().toArray());
  return {
    products: data
  };
}

async function getById(id){
  if(!ObjectId.isValid(id)) return null;
  const data = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));
  return !data ? null : data;
}

async function updateProduct(id, name, quantity){
  if(!ObjectId.isValid(id)) return null;
  const data = await connection().then((db) =>
    db.collection('products').findOne(new ObjectId(id)));
  if(!data) return null;
  await connection().then((db) => db.collection('products').updateOne(
    {_id: ObjectId(id)},
    {$set: { name: name, quantity: quantity}
    }
  ));
  return {
    _id: id,
    name,
    quantity
  };
}

async function deleteProduct(id) {
  if(!ObjectId.isValid(id)) return null;
  const data = await connection().then((db) =>
    db.collection('products').findOne(new ObjectId(id)));
  if(!data) return null;
  await connection().then((db) => db.collection('products').deleteOne(
    {_id: ObjectId(id)}
  ));
  return data;
}

async function refreshProductQuantity(id, qtd, mode){
  if(!ObjectId(id)) return null;
  const data = await connection().then((db) =>
    db.collection('products').findOne(new ObjectId(id)));
  if(!data) return null;
  if (mode !== 'del'){
    await connection().then((db) =>
      db.collection('products').updateOne({_id: ObjectId(id)},
        {$inc: { quantity: -qtd}}));
    return;
  }
  await connection().then((db) =>
    db.collection('products').updateOne({_id: ObjectId(id)},
      {$inc: {quantity: qtd}}));
  return;
}

module.exports = {
  createProduct, getAll, getById, updateProduct, deleteProduct,refreshProductQuantity
};
