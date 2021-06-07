const { connectionDb } = require('./connection');
const { ObjectID, ObjectId } = require('mongodb');

const create = async ({ name = '', quantity = '' }) => {
  try {
    if (!name || !quantity) {
      throw new Error('Parâmetro(s) inválido(s)');
    }
    const productCollection = await connectionDb()
      .then((db) => db.collection('products'));
    const setNewProduct = await productCollection.insertOne({
      name,
      quantity: Number(quantity),
    });
    return setNewProduct.ops[0];
  } catch (err) {
    return err;
  }
};

const getByKey = async (getKey) => {
  try {
    if (!getKey) throw new Error('{ key: value } não informado!');
    let [key, value] = Object.entries(getKey)[0];
    value = key === '_id' ? ObjectId(value) : value;
    const getCollection = await connectionDb().then((db) => db.collection('products'));
    const result = await getCollection.findOne({ [key]: value });
    return result;
  } catch (err) {
    return err;
  }
};

const getAll = async () => {
  try {
    const getCollection = await connectionDb().then((db) => db.collection('products'));
    const result = await getCollection.find();
    return result.toArray();
  } catch (err) {
    return err;
  }
};

const update = async (product) => {
  try {
    const { _id } = product;
    delete product._id;
    const getCollection = await connectionDb().then((db) => db.collection('products'));
    await getCollection
      .updateOne(
        { _id: new ObjectId(_id) },
        { $set: { ...product } }
      );
    product._id = _id;
    return product;
  } catch (err) {
    return err;
  }
};

const restoreQuantity = async (product) => {
  try {
    const { _id, quantity } = product;
    const getCollection = await connectionDb().then((db) => db.collection('products'));
    await getCollection
      .updateOne(
        { _id: new ObjectId(_id) },
        { '$inc': { quantity: quantity } } 
      );
    return true;
  } catch (err) {
    return err;
  }
};

const deleteProduct = async (idProduct) => {
  try {
    const getCollection = await connectionDb().then((db) => db.collection('products'));
    const result = await getCollection.deleteOne(idProduct);
    return { deletedCount: result.deletedCount }; 
  } catch (err) {
    return err;
  }
};

module.exports = {
  create,
  getByKey,
  getAll,
  update,
  deleteProduct,
  restoreQuantity,
};
