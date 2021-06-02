const connection = require('./connection');
const { ObjectId } = require('mongodb');
const productsModel = require('../models/productsModel');

const validate = async (quantity) => {
  const zero = 0;
  if (quantity <= zero || typeof quantity !== 'number') 
    return 'Wrong product ID or invalid quantity';

  return undefined;
};

// const updateProduct = async ({productId, quantity}) => {
//   const db = await connection();
  
//   const product = await db.collection('products').findOne(ObjectId(productId));
//   console.log(product);
  
//   const newQuantity = product.quantity - quantity;
  
//   console.log(newQuantity);
//   const productNw = await db.collection('products').updateOne(
//     { _id: productId }, { $set: { quantity: newQuantity } }
//   );

//   const productNew = await db.collection('products').findOne(ObjectId(productId));

//   console.log(productNew);
// };

const validateSale = async(sales) => {
  const sale = sales[0];
  const zero = 0;

  const product = await productsModel.getById(sale.productId);
  
  const newQuantity = product.quantity - sale.quantity;
  
  if (newQuantity < zero)
    return 'Such amount is not permitted to sell';
};

const newSale = async( sales ) => {
  const db = await connection();

  const notValid = await validate(sales[0].quantity);

  if (notValid !== undefined) throw new Error(notValid);

  await db.collection('sales').insertOne({ itensSold: [...sales] });

  const positiveAmount = await validateSale(sales);

  if(positiveAmount) 
    throw { code: positiveAmount, message: 'Such amount is not permitted to sell' };

  const allSales = await db.collection('sales').find().toArray();

  return allSales[0];
};

const getAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();

  return sales;
};

const getById = async (id) => {
  const db = await connection();

  if (!ObjectId.isValid(id)) return null;

  const sale = await db.collection('sales').findOne(ObjectId(id));

  return sale;
};

const exclude = async (id) => {
  const db = await connection();

  const sale = await getById(id);

  if(!sale) throw { code: 'invalid_data', message: 'Wrong sale ID format' };
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  
  return sale;
};

module.exports = { 
  newSale,
  getAll,
  getById,
  exclude
};
