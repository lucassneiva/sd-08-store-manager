const connection = require('./connection');
const { ObjectId } = require('mongodb');

const registerSale = async (sales) => {
  try {
    return await connection().then((db) => db.collection('sales').insertOne(sales));
  } catch (error) {
    console.error(error);
  }
};

const getAllSales = async () => {
  try {
    return await connection().then((db) => db.collection('sales').find().toArray());
  } catch (error) {
    console.error(error);
  }
};

const getSalesByID = async (id) => {
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
  deleteSaleByID
};
