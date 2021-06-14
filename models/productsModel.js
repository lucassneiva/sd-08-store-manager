const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (dataForUpdate) => {
  const db = await connection();
  const result = await db.collection('products').insertOne(dataForUpdate);
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
  try {
    const result = await db.collection('products').findOne({ _id: ObjectId(id) });
    return result;
  } catch (err) {
    console.error(`Id ${id} not found \n.`);
    return { error: true };
  }
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

module.exports = {
  create,
  getAll,
  getByName,
  getById,
  update,
  remove
};
