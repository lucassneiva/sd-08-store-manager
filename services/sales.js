const SalesModel = require('../models/sales');
const ProductsModel = require('../models/products');

const { ObjectId } = require('mongodb');

const isQuantityInvalid = (quantity) => {
  const MIN_QUANTITY = 1;


  if(typeof quantity !== 'number') {
    throw new Error('Wrong product ID or invalid quantity');
  }

  if(quantity < MIN_QUANTITY) {
    throw new Error('Wrong product ID or invalid quantity');
  }
};

const create = async (itensSold) => {
  
  const productPromise = itensSold.map((sale) => ProductsModel.readById(sale.productId));
  const products = await Promise.all(productPromise);

  if (products.some((product) => !product)) {
    throw new Error('Wrong product ID or invalid quantity');
  }

  itensSold.forEach((elem) => isQuantityInvalid(elem.quantity));

  const newSale = { itensSold };

  const { insertedId: _id } = await SalesModel.create(newSale);

  return {
    _id,
    itensSold,
  };
};

const read = async () => SalesModel.read();

const readById = async (id) => {
  console.log(id, ObjectId.isValid(id));

  if(!ObjectId.isValid(id)){
    throw new Error('Sale not found');
  }

  const sale = await SalesModel.readById(id);

  if(!sale) {
    throw new Error('Sale not found');
  }

  return sale;
};

const update = async (id, productId, quantity) => {
  
  if(!ObjectId.isValid(id)){
    throw new Error('Sale not found');
  }

  const sale = await SalesMode.readById(id);

  if(!sale) {
    throw new Error('Wrong product ID or invalid quantity');
  }

  isQuantityInvalid(quantity);

  await SalesModel.update(id, productId, quantity);

  return {
    _id: id,
    itensSold: {
      productId,
      quantity,
    }
  };
};

module.exports = {
  create,
  read,
  readById,
  update,
};