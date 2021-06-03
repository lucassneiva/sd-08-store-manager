const connection = require('./connection');
const { ObjectId, ObjectID } = require('mongodb');

const ProductModel = require('./productsModel');

const createSales = async (itens) => {
  const itensSold = itens;

  const result = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => ({ _id: result.insertedId, itensSold }));

  return result;
};

const getSales = async () => {
  const result = await connection()
    .then((db) => db.collection('sales').find().toArray());

  return result;
};

const getSalesById = async (id) => {
  if (!ObjectID.isValid(id)) { return null; };

  const result = await connection()
    .then((db) => db.collection('sales').findOne({ _id: new ObjectId(id) }));

  return result;
};

const updateSale = async (id, itens) => {
  const verifyProduct = await getSalesById(id);
  if (!verifyProduct) return null;

  await connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: new ObjectId(id) },
      { $set: { itensSold: itens } }
    ));

  return ({ _id: new ObjectId(id), itensSold: itens });
};

const removeSale = async (id) => {
  const sale = await getSalesById(id);
  if (!sale) return null;

  await connection().then((db) => db.collection('sales')
    .deleteOne({ _id: ObjectId(id) }));

  return sale;
};

const handleProductQuantity = async ({ productId, quantity }) => {
  const product = await ProductModel.getProductById(productId);
  if (!product) return null;


  await connection()
    .then((db) => db.collection('products').updateOne(
      { _id: new ObjectId(productId) },
      { $set: { quantity: quantity } }
    ));

  const updatedProduct = await ProductModel.getProductById(productId);


  return updatedProduct;
};

module.exports = {
  createSales,
  getSales,
  getSalesById,
  updateSale,
  removeSale,
  handleProductQuantity,
};
