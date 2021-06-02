const connection = require('../config/connection');
const { ObjectId, ObjectID } = require('mongodb');

const createProduct = async (name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products')
      .insertOne({ name, quantity }))
    .then(result => result.ops[0]);

  const response = {
    _id: product._id,
    name,
    quantity
  };
  return response;
};



const getAllProducts = () => connection()
  .then((db) => db.collection('products').find().toArray())
  .then((products) => {
    return {products: products.map(({ _id, name, quantity }) => {
      return {
        _id,
        name,
        quantity,
      };
    })};
  });

const  getProductById = async (id) => {
  const product = await connection()
    .then((db) =>  db.collection('products').findOne(ObjectId(id)));

  return product;
};

const updateProduct =async (id, name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products')
      .updateOne(
        { _id: ObjectID(id) },
        {$set: { name, quantity }}))
    .then(() => ({ _id: id, name, quantity }));

  return product;
};

const deleteProduct = async (id) => {
  const product = await connection().then((db) =>
    db.collection('products').deleteOne({ _id: ObjectId(id) })
  );
  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

