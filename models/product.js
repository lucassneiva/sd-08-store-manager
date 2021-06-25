const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const db = await connection();
  const otherProduct = await db.collection('products').insertOne({ name, quantity });

  return otherProduct.ops[0];
};

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();

  return products;
};

const getById = async (id) => {
  try {
    const product = await connection().then((db) =>
      db.collection('products').findOne(new ObjectId(id)),
    );

    if (!product) return null;

    return product;
  } catch (err) {
    return null;
  }
};

const update = async (id, name, quantity) =>  {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const updateProduct = await db.collection('products')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, quantity } }, 
      { returnOriginal: false}
    );

  if (!updateProduct) return null;

  return updateProduct.value;
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const deletedProduct = await getById(id);
  const db = await connection();
  await db.collection('products').deleteOne({ _id: ObjectId(id) });

  return deletedProduct;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById
};
