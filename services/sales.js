const SalesModel = require('../models/sales');
const ProductsModel = require('../models/products');

const { ObjectID } = require('mongodb');

const isQuantityInvalid = (quantity) => {
  const MIN_QUANTITY = 1;

  console.log(quantity, typeof quantity);

  if(typeof quantity !== 'number') {
    console.log('diferente de número');
    throw new Error('Wrong product ID or invalid quantity');
  }

  if(quantity < MIN_QUANTITY) {
    console.log('menor ou igual a 0');

    throw new Error('Wrong product ID or invalid quantity');
  }
};

const isIdValid = (sale) => {

  if( !ObjectID.isValid(sale._id) ){
    console.log('id invalido');
    throw new Error('Wrong product ID or invalid quantity');
  }
};

const create = async (itensSold) => {
  
  const productPromise = itensSold.map((sale) => ProductsModel.readById(sale.productId));
  const products = await Promise.all(productPromise);

  if (products.some((product) => !product)) {
    throw new Error('Wrong product ID or invalid quantity');
  }

  console.log(products, 'products');

  itensSold.forEach((elem) => isQuantityInvalid(elem.quantity));
  
  console.log('depois da quantidade');

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