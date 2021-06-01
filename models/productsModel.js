const connection = require('./connection');
const { ObjectId } = require('mongodb');

const validate = async (name, quantity, product) => {
  const zero = 0;
  const five = 5;
  if (name.length < five) return '"name" length must be at least 5 characters long';
  if (product) return 'Product already exists';
  if (typeof quantity !== 'number') return '"quantity" must be a number';
  if (quantity <= zero) return '"quantity" must be larger than or equal to 1';

  return undefined;
};

const validateUpdate = async (name, quantity) => {
  const zero = 0;
  const five = 5;
  if (name.length < five) return '"name" length must be at least 5 characters long';
  if (typeof quantity !== 'number') return '"quantity" must be a number';
  if (quantity <= zero) return '"quantity" must be larger than or equal to 1';

  return undefined;
};

const newProduct = async(name, quantity) => {
  const db = await connection();

  const product = await db.collection('products').findOne({ name });

  const notValid = await validate(name, quantity, product);
  if (notValid) throw new Error(notValid);

  const addProduct = await db.collection('products').insertOne({ name, quantity });

  return { _id: addProduct.insertedId, name, quantity };
};

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const getById = async (id) => {
  const db = await connection();

  if (!ObjectId.isValid(id)) return null;

  const product = await db.collection('products').findOne(ObjectId(id));

  return product;
};

const update = async (id, name, quantity) => {
  const db = await connection();

  const notValid = await validateUpdate(name, quantity);
  if (notValid) throw new Error(notValid);

  await db.collection('products').updateOne({ _id: id }, { $set: { name, quantity } });

  return { _id: id, name, quantity };
};

const exclude = async (id) => {
  const db = await connection();

  const product = await getById(id);

  if(!product) throw { code: 'invalid_data', message: 'Wrong id format' };
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
  
  return product;
};


module.exports = { 
  newProduct,
  getAll,
  getById,
  update,
  exclude
};
