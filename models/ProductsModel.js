const connection = require('./connect');

const { ObjectId } = require('mongodb');

const addProduct = async (product) => {
  return connection()
    .then((db) => db.collection('products').insertOne(product))
    .then((result) => (result.ops[0]));
};

const findProduct = async ({ name }) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  if (!product) return null;

  return product;
};

const getAll = async () => {
  return connection()
    .then((db) => db
      .collection('products')
      .find()
      .toArray());
};

const getAllById = async (id) => {
  try {
    const product = await connection()
      .then((db) => db
        .collection('products')
        .findOne(new ObjectId(id)));

    if (!product) return null;

    return product;

  } catch (err) {
    return null;
  }
};


const updateProduct = async (id, newProduct) => {
  try {
    const updateFinal = await connection()
      .then((db) => db
        .collection('products')
        .updateOne({_id: ObjectId(id)}, { $set: newProduct }),
      );

    if (!updateFinal.matchedCount) return null;

    return {
      _id: id,
      ...newProduct
    };
  } catch (err) {
    return null;
  }
};

const deleteProduct = async (id) => {
  const deletedProduct = await connection()
    .then((db) => db
      .collection('products').deleteOne(new ObjectId(id)),
    );
};


module.exports = {
  addProduct,
  findProduct,
  getAll,
  getAllById,
  updateProduct,
  deleteProduct,
};
