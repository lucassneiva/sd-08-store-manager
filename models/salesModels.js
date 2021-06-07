const { ObjectId } = require('mongodb');
const connect = require('./connection');

const COLLECTION_NAME = 'sales';

const create = async (sales) => 
  connect().then(async (db) => {
    const products = await db.collection(COLLECTION_NAME)
      .insertOne({itensSold: sales});
    console.log('linha 13 sales model', products.ops[0]);
    return products.ops[0];
  });


const getAll = async () =>
  connect().then((db) => db.collection(COLLECTION_NAME).find().toArray());


const getByName = async (nome) => {
  const productExists = await connect()
    .then((db) => db.collection(COLLECTION_NAME).findOne({name: nome}));
  return productExists;
};


const getById = async (id) => {
  try {
    await ObjectId.isValid(id);
    const productsById = await connect()
      .then((db) => db.collection(COLLECTION_NAME).findOne({ _id: ObjectId(id) }));
    console.log('linha 33 models', productsById);
    return productsById;
  } catch (error) {
    return null;
  }
};

const update = async (id, name, quantity) => {
  const updateProducts = await connect().then((db) => 
    db
      .collection(COLLECTION_NAME)
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
      
 
  console.log('linha 48 models', updateProducts);
  return updateProducts;
};

const exclude = async (id) => {
  try {
    await connect().then(async (db) => {
      const productsById = await getById(id);
      db.collection(COLLECTION_NAME).deleteOne({ _id: ObjectId(id) });
      if (await productsById) return productsById;
    });
  } catch (error) {
    return null;
  }
};

module.exports = { 
  create,
  getAll,
  getByName,
  getById,
  update,
  exclude
};
