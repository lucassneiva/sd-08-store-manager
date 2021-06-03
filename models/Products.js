const { connection } = require('./connection');
const { ObjectId } = require('mongodb');
const saveMe = require('../utils/saveMe');

// A função de insert do mongodb injeta o _id no objeto que é passado
// como argumento. Resultado, durante os testes o mock utilizado para o
// produto pode ser usado no primeiro insert, mas no segundo é gerado
// um erro de dup key. go0dD4m mut4t10nS :poop: :poop: :poop:
const create = saveMe(async ({ name, quantity }) => {
  const db = await connection();
  const { insertedId } = await db.collection('products')
    .insertOne({ name, quantity });
  return { _id: insertedId, name, quantity };
});

const getById = saveMe(async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('products').findOne(ObjectId(id));
  return result;
});

const getByName = saveMe(async (name) => {
  const db = await connection();
  const result = await db.collection('products').findOne({ name });
  return result;
});

const getAll = saveMe(async () => {
  const db = await connection();
  const result = await db.collection('products').find().toArray();
  return result;
});

const edit = saveMe(async (id, updatedProduct) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const { modifiedCount } = await db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: updatedProduct });
  if (!modifiedCount) return null;
  return { _id: id, ...updatedProduct };
});

const remove = saveMe(async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const product = await getById(id);
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return product;
});

module.exports = {
  create,
  getById,
  getByName,
  getAll,
  edit,
  remove
};
