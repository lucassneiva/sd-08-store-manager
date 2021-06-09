const connection = require('./connection');
const { ObjectId } = require('mongodb');
const { quantityMenorEstoque } = require('../schemas/errorMessages');

const registerSale = async (sales) => {
  try {
    return await connection().then((db) => db.collection('sales').insertOne(sales));
  } catch (error) {
    console.error(error);
  }
};

const updateQuantity = async (idProduct, quantity) => {
  try {
    // garantindo que nunca sera menor que zero
    const product = await connection()
      .then((db) => db.collection('products').find({_id: ObjectId(idProduct)}).toArray());

    const quanty = product[0].quantity;
    
    if(quanty < quantity) return quantityMenorEstoque;
    

    // console.log(quanty, quantity);

    await connection().then((db) => db.collection('products')
      .updateOne({ _id: ObjectId(idProduct) }, {$inc: {quantity: - quantity}}))
      .then((product) => product);

    return true;
  } catch (error) {
    console.error(error);
  }
};

const sumQuantity = async (idProduct, quantity) => {
  try {

    await connection().then((db) => db.collection('products')
      .updateOne({ _id: ObjectId(idProduct) }, {$inc: {quantity}}))
      .then((product) => product);

  } catch (error) {
    console.error(error);
  }
};
// aqui
const getAllSales = async () => {
  try {
    return await connection().then((db) => db.collection('sales').find().toArray());
  } catch (error) {
    console.error(error);
  }
};

const getSalesByID = async (id) => { // aqui
  try {
    const resp = await connection()
      .then((db) => ObjectId.isValid(id)? db.collection('sales')
        .find({_id: ObjectId(id)}).toArray() : null);
        
    return resp;
  } catch (error) {
    console.error(error);
  }
};

const updateSaleByID = async (id, quantity, productId) => {
  try {
    await connection().then((db) => db.collection('sales')
      .updateOne({_id: ObjectId(id)},
        {$set: {itensSold: [{productId, quantity}]}})).then((sale) => sale);
    
    const resp = await connection()
      .then((db) => ObjectId.isValid(id)? db.collection('sales')
        .find({_id: ObjectId(id)}).toArray() : null);

    return resp;

  } catch (error) {
    console.error(error);
  }
};

const getSale = async (id) => {
  const resp = await connection()
    .then((db) => ObjectId.isValid(id)? db.collection('sales')
      .find({_id: ObjectId(id)}).toArray(): null);
  // console.log(resp)
  return resp;
};

const deleteSaleByID = async (id) => {
  try {
    await connection().then((db) => db.collection('sales')
      .deleteOne({_id: ObjectId(id)})).then((sale) => sale); 
    return true;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  registerSale,
  getAllSales,
  getSalesByID,
  updateSaleByID,
  deleteSaleByID,
  updateQuantity,
  sumQuantity,
  getSale
};
