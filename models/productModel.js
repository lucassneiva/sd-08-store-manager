const { connectionDb } = require('./connection');
const { ObjectID, ObjectId } = require('mongodb');

const create = async ({ name = '', quantity = '' }) => {
  try {
    if (!name || !quantity) {
      throw new Error('Parâmetro(s) inválido(s)');
    }
    const productCollection = await connectionDb()
      .then((db) => db.collection('products'));
    const setNewProduct = await productCollection.insertOne({ name, quantity });
    return setNewProduct.ops[0];
  } catch (err) {
    return err;
  }
};

const getByKey = async (getKey) => {
  try {
    if(!getKey) throw new Error('{ key: value } não informado!');
    let [key, value] = Object.entries(getKey)[0];
    value = key === '_id' ? ObjectId(value) : value;
    const getCollection = await connectionDb()
      .then((db) => db.collection('products'));

    const result = await getCollection.findOne({ [key]: value });
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = {
  create,
  getByKey,
};