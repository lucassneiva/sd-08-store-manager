const connection = require('./connection');
const { ObjectId } = require('mongodb');

const registerProduct = async (name, quantity) => {
  try {
    const product = await connection()
      .then((db) => db.collection('products').insertOne({ name, quantity }))
      .then((product) => (product.ops[0]));
    return { _id: product._id, name, quantity };
  } catch (error) {
    console.error(error);
  }
};

const checkIfNameExists = async (name) => {
  try {
    const product = await connection()
      .then((db) => db.collection('products').find({name}).toArray())
      .then((product) => product);
    return product;
  } catch (error) {
    console.error(error);
  }
};

const getAllProducts = async () => {
  try {
    const products = await connection()
      .then((db) => db.collection('products').find().toArray());
    
    return { products };
  } catch (error) {
    console.error(error);
  }
};

const getProductByID = async (id) => {
  try {
    const productId = await connection()
      .then((db) => ObjectId.isValid(id) ? db.collection('products')
        .find({_id: ObjectId(id)}).toArray() : null);

    return productId;
  } catch (error) {
    console.error(error);
  }
};

const updateProductByID = async (id, name, quantity) => {
  try {
    await connection().then((db) => db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
      .then((product) => product);

    return {_id: id, name, quantity};
  } catch (error) {
    console.error(error);
  }
};

const deleteProductByID = async (id) => {
  try {
    const product = await connection()
      .then((db) => ObjectId.isValid(id) ? db.collection('products')
        .find({_id: ObjectId(id)}).toArray() : null);

    await connection().then((db) => db.collection('products')
      .deleteOne({_id: ObjectId(id)}))
      .then((product) => product);

    return product;
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  registerProduct,
  checkIfNameExists,
  getAllProducts,
  getProductByID,
  updateProductByID,
  deleteProductByID,
};
