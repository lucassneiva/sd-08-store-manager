const { connectionDb } = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (itensSold) => {
  try {
    const getCollection = await connectionDb()
      .then((db) => db.collection('sales'));
    const setSales = await getCollection.insertOne({ itensSold });
    return setSales.ops[0];
  } catch (err) {
    return err;
  }
};

const getAll = async () => {
  try {
    const getAllCollection = await connectionDb()
      .then((db) => db.collection('sales'))
      .then((getCollection) => getCollection.find());
    return getAllCollection.toArray();
  } catch (err) {
    return err;
  }
};

const getById = async (id) => {
  try {
    const getAllCollection = await connectionDb()
      .then((db) => db.collection('sales'))
      .then((getCollection) => getCollection.find({ _id: id }));
    return getAllCollection.toArray();
  } catch (err) {
    return err;
  }
};

const update = async (updateSale, id) => {
  try {
    const getUpdateCollection = await connectionDb()
      .then((db) => db.collection('sales'))
      .then((getCollection) => getCollection.updateOne(
        { '_id': ObjectId(id) },
        { '$set': {
          'itensSold.$[elemento].quantity': updateSale.quantity,
        } },
        { 'arrayFilters': [{ 'elemento.productId': updateSale.productId }] }
      ));
    
    return getUpdateCollection;
  } catch (err) {
    return err;
  }
};

const deleteSale = async (id) => {
  console.log(id);
  try {
    await connectionDb()
      .then((db) => db.collection('sales'))
      .then((getCollection) => getCollection.deleteOne({ _id: ObjectId(id) }));
    console.log('aqui');
    return true;
  } catch (err) {
    return err;
  } 
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteSale,
};
