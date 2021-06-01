const connection = require('./connection');
const { ObjectId, MongoError, } = require('mongodb');

const createProducts = async (name, quantity) =>  {
  const creation = await connection()
    .then((db) => db.collection('products').insertOne({name, quantity}))
    .then(result => {
      return ({
        _id: result.insertedId,
        name,
        quantity,
      });
    });
  return creation;
};


const uniqueValue = async (name) => {
  const info = await connection()
    .then((db) => db.collection('products').findOne({ name: name }))
    .then((result)=> result);
  return info;   
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const info = await connection()
    .then((db) => db.collection('products').findOne({ _id:  ObjectId(id) }))
    .then((result)=> result);
  return info;

};


const getAll = async () =>{
  const data = await connection()
    .then((db) => db.collection('products').find().toArray())
    .then((result) => result);
  return data;
};

const updateProduct = async (id, {name, quantity} ) => {
  const info = await connection()
    .then((db) => db.collection('products').
      updateOne({ _id:  ObjectId(id) }, {$set:{name:name, quantity:quantity}} ))
    .then(result => {
      return ({
        _id: result.insertedId,name,quantity,});
    });   
  return info;
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const info = await connection()
    .then((db) => db.collection('products').deleteOne({ _id:  ObjectId(id) } ))
    .then((result) => result);

  return info;
};
    
module.exports = {
  createProducts,
  uniqueValue,
  findById,
  getAll,
  updateProduct,
  deleteProduct
};