const connection = require('./connection');
const { ObjectId, ObjectID } = require('mongodb');

const ProductModel = require('./productsModel');
const SalesServices = require('../services/salesServices');

const createSales = async (itens) => {
  try {
    const itensSold = itens;

    const result = await connection()
      .then((db) => db.collection('sales').insertOne({ itensSold }))
      .then((result) => ({ _id: result.insertedId, itensSold }));

    return result;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const getSales = async () => {
  try {
    const result = await connection()
      .then((db) => db.collection('sales').find().toArray());

    return result;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const getSalesById = async (id) => {
  try {
    if (!ObjectID.isValid(id)) { return null; };

    const result = await connection()
      .then((db) => db.collection('sales').findOne({ _id: new ObjectId(id) }));

    return result;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const updateSale = async (id, itens) => {
  try {
    const verifyProduct = await getSalesById(id);
    if (!verifyProduct) return null;

    await connection()
      .then((db) => db.collection('sales').updateOne(
        { _id: new ObjectId(id) },
        { $set: { itensSold: itens } }
      ));

    return ({ _id: new ObjectId(id), itensSold: itens });
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const removeSale = async (id) => {
  try {
    const sale = await getSalesById(id);
    if (!sale) return null;

    await connection().then((db) => db.collection('sales')
      .deleteOne({ _id: ObjectId(id) }));

    return sale;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const handleProductQuantity = async ({ productId, quantity }) => {
  try {

    const product = await ProductModel.getProductById(productId);
    if (!product) return null;


    await connection()
      .then((db) => db.collection('products').updateOne(
        { _id: new ObjectId(productId) },
        { $set: { quantity: quantity } }
      ));

    const updatedProduct = await ProductModel.getProductById(productId);


    return updatedProduct;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

module.exports = {
  createSales,
  getSales,
  getSalesById,
  updateSale,
  removeSale,
  handleProductQuantity,
};
