const salesModel = require('../models/sales');
const productsModel = require('../models/products');
const { ObjectId } = require('mongodb');

const MINIMUM_STOCK = 1;
const STOCK_EMPTY = 0;
const EMPTY = 0;

const isValid = (quantity) => {
  if (quantity < MINIMUM_STOCK || !quantity || typeof quantity !== 'number')
    return 'Wrong product ID or invalid quantity';

  return true;
};

const isStockAvailable = async (arr) => {
  let newArr = [];

  for (let index = EMPTY; index < arr.length; index += 1) {
    const { productId, quantity } = arr[index];
    const product = await productsModel.getById(productId);
    const total = product.quantity - quantity;
    if (total < STOCK_EMPTY) return 'Such amount is not permitted to sell';
    newArr.push({ name: product.name ,id: productId, total });
  }

  return newArr;
};

const create = async (arr) => {
  const isSaleValid = arr.map(({ quantity }) => isValid(quantity))
    .filter(element => typeof element !== 'boolean');
  if (isSaleValid.length !== EMPTY) throw new Error(isSaleValid[0]);

  const stock = await isStockAvailable(arr);
  if (typeof stock === 'string') throw new Error(stock);
  
  for (let index = EMPTY; index < stock.length; index += 1) {
    const { name, id, total } = stock[index];
    await productsModel.update(id, name, total);
  }

  const { _id } = await salesModel.create(arr);

  return {
    _id,
    itensSold: arr,
  };
};

const getAll = async () => await salesModel.getAll();

const getById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Sale not found');
  
  const sale = await salesModel.getById(id);

  if (!sale) throw new Error('Sale not found');

  const { _id, itensSold } = sale;

  return {
    _id,
    itensSold,
  };
};

const update = async (_id, arr) => {
  const isSaleValid = arr.map(({ quantity }) => isValid(quantity))
    .filter(element => typeof element !== 'boolean');
    
  if (isSaleValid.length !== EMPTY) throw new Error(isSaleValid[0]);

  await salesModel.update(_id, arr);

  return {
    _id,
    itensSold: arr,
  };
};

const addToStock = async (arr) => {
  let newArr = [];

  for (let index = EMPTY; index < arr.length; index += 1) {
    const { productId, quantity } = arr[index];
    const product = await productsModel.getById(productId);
    const total = product.quantity + quantity;
    newArr.push({ name: product.name ,id: productId, total });
  }

  return newArr;
};

const erase = async (_id) => {
  if (!ObjectId.isValid(_id)) throw new Error('Wrong sale ID format');

  const sale = await salesModel.getById(_id);
  const newStock = await addToStock(sale.itensSold);
  
  for (let index = EMPTY; index < newStock.length; index += 1) {
    const { name, id, total } = newStock[index];
    await productsModel.update(id, name, total);
  }

  await salesModel.erase(_id);

  return true;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  erase,
};
