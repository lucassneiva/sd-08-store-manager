const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const db = await connection();
  const result = await db.collection('products').insertOne({
    name,
    quantity
  });
  return result;
};

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('products').find().toArray();
  return result;
};

const getByName = async (name) => {
  const db = await connection();
  const result = await db.collection('products').findOne({ name });
  return result;
};

const getById = async (id) => {
  const db = await connection();
  const result = await db.collection('products').findOne({ _id: ObjectId(id) });
  return result;
};

const update = async (id, dataForUpdate) => {
  const db = await connection();
  const result = await db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: dataForUpdate });;
  return result;
};

const remove = async (id) => {
  const db = await connection();
  const product = await getById(id);
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return product;
};

//getById('60c4f6f6ecc0b62dd790c178').then(console.log);
//create('carne', 10).then(console.log);
//updateOne('60c5077010eb4f4916417f9b', { name: 'feijoada', quantity: 10}).then(console.log);
//remove('60c514fc910a926757f93344').then(console.log);
//getAll().then(console.log);


module.exports = {
  create,
  getAll,
  getByName,
  getById,
  update,
  remove
};