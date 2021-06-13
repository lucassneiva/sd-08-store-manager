const { ObjectId } = require('mongodb');
const SalesModel = require('../models/SalesModel');
const ProductsModel = require('../models/ProductsModel');

const MIN_QUANTITY = 0;

const addSale = async (sale) => {

  const idAll = await ProductsModel
    .getAll()
    .then((products) => products
      .map((product) => ObjectId(product['_id']).toString()),
    );

  const saleAlreadyExists = sale
    .every((item) => isValidProduct(item, idAll));

  if (!saleAlreadyExists)
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };

  return SalesModel
    .addSale(sale);
};

const isValidProduct = (
  { productId, quantity },
  idAll,
) => {
  
  if (quantity <= MIN_QUANTITY) return false;
  
  if (!Number.isInteger(quantity)) return false;
    
  if (!idAll.includes(productId)) return false;
  
  return true;
};

module.exports = { 
  addSale,
  isValidProduct,
};