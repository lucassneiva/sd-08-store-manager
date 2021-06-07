const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (name, quantity) => 
  // const products = {
  //   _id: '5f43a7ca92d58904914656b6',
  //   name,
  //   quantity,
  // };
  // return products;
  connect().then(async (db) => {
    const products = await db.collection('products').insertOne({ name, quantity });
    console.log('linha 13 model', products.ops[0]);
    return products.ops[0];
  });


const getAll = async () =>
  connect().then((db) => db.collection('products').find().toArray());


const getByName = async (nome) => {
  const productExists = await connect()
    .then((db) => db.collection('products').findOne({name: nome}));
  return productExists;
};


const getById = async (id) => {
  try {
    // if(!ObjectId.isValid(id)) return null;
    await ObjectId.isValid(id);
    const productsById = await connect()
      .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
    console.log('linha 33 models', productsById);
    return productsById;
  } catch (error) {
    return null;
  }
};

const update = async (id, name, quantity) => {
  const updateProducts = await connect().then((db) => 
    db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
      
 
  console.log('linha 48 models', updateProducts);
  return updateProducts;
};

const exclude = async (id) => {
  try {
    await connect().then(async (db) => {
      const productsById = await getById(id);
      db.collection('products').deleteOne({ _id: ObjectId(id) });
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
