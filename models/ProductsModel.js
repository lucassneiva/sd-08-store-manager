const connection = require('../db');
const { ObjectId } = require('mongodb');
const { results, generateMessage } = require('../services/ErrorMessage');

module.exports = {
  addProduct: async (name, quantity) => {
    const db = await connection();
    const result = await db.collection('products').insertOne({
      name,
      quantity,
    });
    return result.ops[0];
  },
  getByName: async (name) => {
    const db = await connection();
    const result = await db.collection('products').findOne({
      name: name,
    });
    return result;
  },
  getAllProducts: async () => {
    const db = await connection();
    const productsList = await db.collection('products').find().toArray();
    const result = { products: productsList };
    return result;
  },
  getOneProduct: async (id) => {
    const db = await connection();
    let result = null;
    if (ObjectId.isValid(id)) {
      result = await db.collection('products').findOne({ _id: ObjectId(id) });
    }
    if (result === null) {
      return generateMessage(results.invalidId);
    }
    return result;
  },
  editProduct: async (id, name, quantity) => {
    const db = await connection();
    const result = await db.collection('products').updateOne(
      {
        _id: ObjectId(id),
      },
      { $set: { name, quantity } },
    );
    return {
      id,
      name,
      quantity,
    };
  },
};
