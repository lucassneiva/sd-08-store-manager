const connection = require('./connection');
const { ObjectId } = require('mongodb');


/***********CADASTRANDO PRODUTO *************/
const createProduct = async (name, quantity) =>{
  const db = await connection();
  const newProduct = await db.collection('products')
    .insertOne({ name, quantity });
  return newProduct;
};

/*************LISTANDO TODOS OS PRODUTOS *************/

const getAll = async () => {
  const db = await connection();
  const product = await db.collection('products').find().toArray();
  if (product) return product;
};
/*************LISTANDO PRODUTO POR ID *************/
const getById = async (id) => {
  const db = await connection();
  const productId = await db.collection('products').findOne(ObjectId(id));
  return productId;
};

/*************LISTANDO PRODUTO POR NOME *************/
const findProducts= async (name, quantity) => {
  const db = await connection();
  const isFound = await db.collection('products').findOne({name});
  return isFound;
};

/*************ATUALIZANDO UM PRODUTO *************/

const updateOne = async ( id, name, quantity ) => {
  const db = await connection();
  await  db.collection('products')
    .updateOne({ _id: id }, { $set: { name, quantity } });
  return { _id: id, name, quantity };
};

/************* EXCLUINDO PRODUTO *************/

const deleteOne = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const productId = await db.collection('products').findOne(ObjectId(id));
  await db.collection('products').deleteOne({ _id: ObjectId(id)});
  if(productId) productId;
};


module.exports = {
  deleteOne,
  updateOne,
  getById,
  getAll, 
  createProduct, 
  findProducts
};