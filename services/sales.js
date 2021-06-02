const SalesModel = require('../models/sales');
const ProductsModel = require('../models/products');

const { ObjectID } = require('mongodb');

const isQuantityInvalid = (quantity) => {
  const MIN_QUANTITY = 1;


  if(typeof quantity !== 'number') {
    throw new Error('Wrong product ID or invalid quantity');
  }

  if(quantity < MIN_QUANTITY) {
    throw new Error('Wrong product ID or invalid quantity');
  }
};

const isIdValid = (sale) => {

  if( !ObjectID.isValid(sale._id) ){
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

  const { inserterId: _id } = await SalesModel.create(newSale);

  return {
    _id,
    itensSold,
  };
};

module.exports = {
  create,
};