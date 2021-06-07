const { ObjectId } = require('mongodb');
const connect = require('./connection');

const checkProductExistsByName = async (name) => {
  const connection = await connect();
  const product = await connection.collection('products').findOne({ name });

  return Boolean(product);
};

const createProduct = async (name, quantity) => {
  const connection = await connect();
  const newProduct = await connection.collection('products').insertOne({
    name,
    quantity
  });

  return newProduct.ops[0];
};

const updateProduct = async (_id, name, quantity) => {
  const connection = await connect();
  const updatedProduct = await connection.collection('products').updateOne(
    { _id: ObjectId(_id) },
    {
      $set: {
        name,
        quantity
      }
    }
  );

  return updatedProduct;
};

const deleteProduct = async (_id) => {
  try {
    const connection = await connect();

    const productToDelete = await connection
      .collection('products')
      .findOne({ _id: ObjectId(_id) });
    if (!productToDelete) return;

    const deletedStatus = await connection
      .collection('products')
      .deleteOne({ _id: ObjectId(_id) });
    if (deletedStatus.deletedCount !== 1) return;

    return productToDelete;
  } catch {
    return;
  }
};

const listProducts = async (_id) => {
  const connection = await connect();
  if (_id) {
    try {
      const product = await connection
        .collection('products')
        .findOne({ _id: ObjectId(_id) });

      return product;
    } catch {
      return;
    }
  }
  const products = await connection.collection('products').find().toArray();
  return products;
};

module.exports = {
  updateProduct,
  checkProductExistsByName,
  createProduct,
  deleteProduct,
  listProducts,
};
