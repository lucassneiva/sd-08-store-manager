const connection = require('./connection');
const { ObjectID } = require('mongodb');

const create = async ({ name = '', quantity = '' }) => {
  try {
    if (!name || !quantity) {
      throw new Error('Parâmetro(s) inválido(s)');
    }
    const productCollection = await connection()
      .then((db) => db.collection('products'));
    
    const setNewProduct = await productCollection.insertOne({ name, quantity });
    return setNewProduct.ops[0];
  } catch (err) {
    return err;
  }
};

const getByKey = async (getKey) => {
  try {
    let [key, value] = Object.entries(getKey)[0];
    value = key === '_id' ? ObjectID(value) : value;

    const getCollection = await connection()
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