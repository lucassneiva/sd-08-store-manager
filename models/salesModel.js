const connection = require('./connection');
const { ObjectId } = require('mongodb');

const validate = async (quantity) => {
  const zero = 0;
  if (quantity <= zero || typeof quantity !== 'number') 
    return 'Wrong product ID or invalid quantity';

  return undefined;
};

const newSale = async( sales ) => {
  const db = await connection();

  const notValid = await validate(sales[0].quantity);

  if (notValid !== undefined) throw new Error(notValid);

  await db.collection('sales').insertOne({ itensSold: [...sales] });

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
