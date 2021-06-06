const Joi = require('@hapi/joi');
const { validQuantitySale } = require('./product');
const { ObjectId } = require('mongodb');

const validIdProduct = (id) => {
  if (!ObjectId.isValid(id) || !id) {
    return false;
  }
  return true;
};

const validTypeSale = (sale) => {
  if (!Array.isArray(sale) && typeof sale === 'object') {
    return [sale];
  }
  if(Array.isArray(sale)) return sale;
  return false;
};

const validSale = (sales) => {
  const salesOk = validTypeSale(sales);
  if (!salesOk) return false;
  const result = salesOk.every((el) => {
    if(!el.productId || !validIdProduct(el.productId)) {
      return false;
    }
    if(!el.quantity || validQuantitySale({ quantity: el.quantity}).error) {
      return false;
    }
    return true;
  });
  return result;
};

module.exports = {
  validSale,
};

