const connection = require('./connection');
const { ObjectId } = require('mongodb');

const insert = async (name, quantity) =>
  await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

const findByName = async (nameNewProduct) =>
  await connection()
    .then((db) => db.collection('products').findOne({ name: nameNewProduct }))
    .then(response => response)
    .catch(err => console.log(err));

const findById = async (id) => {
  try {
    const db = await connection();
    return await db.collection('products')
      .findOne(new ObjectId(id));
  } catch (error) {
    return null;
  }
};

const getAll = async () => {
  try {
    const db = await connection();
    return await db.collection('products').find().toArray();
  } catch (error) {
    return null;
  }
};

const updateByID = async (id, name, quantity) =>{
  try {
    const db = await connection();
    return await db.collection('products')
      .updateOne(
        { '_id': ObjectId(id) },
        { $set: { 'name': name, 'quantity': quantity },
        });
  } catch (error) {
    return null;
  }
};

const deleteByID = async (id) =>{
  try {
    const db = await connection();
    return await db.collection('products')
      .deleteOne(new ObjectId(id));
  } catch (error) {
    return null;
  }
};

module.exports = {
  getAll,
  insert,
  findByName,
  findById,
  updateByID,
  deleteByID
};
