const connect = require('./Connect');

const { ObjectId, ObjectID } = require('mongodb');

const TABELA_PRODUCTS = 'products';

const addProduct = async (name, quantity) => {
  const add = await connect()
    .then((db) => db.collection(TABELA_PRODUCTS)
      .insertOne({ name, quantity }))
    .catch((_err) => console.log('Deu erro ao adicionar'));
  return add;
};

const findOneProduct = async (name) => {
  const find = await connect()
    .then((db) => db.collection(TABELA_PRODUCTS)
      .find({ name }).toArray())
    .catch((_err) => []);
  return find;
};

const getAll = async () => {
  const all = await connect()
    .then((db) => db.collection(TABELA_PRODUCTS)
      .find({}).toArray())
    .catch((_err) => {});
  return all;
};

const findOneProductById = async (id) => {
  const findById = await connect()
    .then((db) => db.collection(TABELA_PRODUCTS)
      .findOne(ObjectId(id)))
    .catch((_err) => []);
  return findById;
};

const updateOneProductById = async (name, quantity, id) => {
  const updateById = await connect()
    .then((db) => db.collection(TABELA_PRODUCTS)
      .updateOne({ _id: ObjectID(id)}, { $set: { name, quantity } }))
    .catch((_err) => []);
  return updateById;
};

module.exports = {
  addProduct,
  findOneProduct,
  findOneProductById,
  getAll,
  updateOneProductById,
};
