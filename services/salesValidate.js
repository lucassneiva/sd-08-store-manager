const salesModel = require('../models/salesModel');
const productValidate = require('../services/productValidate');

const ZERO = 0;

const validate = (quantity) => {
  const quantityIsValid = 0;
  switch (true) {
  case quantity <= quantityIsValid:
    return { code: 422, message: 'Wrong product ID or invalid quantity'};
  case isNaN(quantity):
    return { code: 422, message: 'Wrong product ID or invalid quantity' };
  default:
    return {};
  }
};

const addSalesProductValidated = async (sales) => {
  const indexZero = 0;
  for (let index = indexZero; index < sales.length; index++) {
    const { quantity } = sales[index];
    const validation = validate(quantity);
    if(validation.message) return validation;
  }

  const result = await salesModel.addSalesProduct(sales);
  
  return { code: 200, result };
};

const getAll = async () => {
  const result = await salesModel.getAll();
  return { code: 200, result };  
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  if (!result) {
    return { code: 404, message: 'Sale not found' };
  }
  return { code: 200, result };
};

const updateQuantity = async (sale) => {
  const indexZero = 0;
  for (let index = indexZero; index < sale.length; index++) {
    const { quantity, productId } = sale[index];
    const product = await productValidate.getById(productId);
    const balance = product.result.quantity - quantity;
    if (balance > ZERO) {
      await productValidate
        .updateProduct(productId, product.result.name, balance);
    }
    if (balance === ZERO) {
      await productValidate
        .deleteProduct(productId);
    }
    if (balance < ZERO) {
      return { code: 404, message: 'Such amount is not permitted to sell'};
    }
  }
};

const updateSale = async (id, sales) => {
  const indexZero = 0;
  for (let index = indexZero; index < sales.length; index++) {
    const { quantity } = sales[index];
    const validation = validate(quantity);
    if(validation.message) return validation;
  }

  const result = await salesModel.updateById(id, sales);
  
  return { code: 200, result };
};

const deleteSale = async (id) => {
  const value = await salesModel.getById(id);
  const result = await salesModel.deleteById(id);
  if (!result) {
    return { code: 422, message: 'Wrong sale ID format' };
  }
  await productAfterDeleteSale(value);
  return { code: 200, result };
};

const productAfterDeleteSale = async (value) => {
  if (value.itensSold[0] !== undefined) {
    const product = await productValidate.getById(value.itensSold[0].productId);
    if (product.message) {
      return { code: 422, message: 'Wrong id format'};
    }
    const balance = product.result.quantity + value.itensSold[0].quantity;
    console.log(product.result.name);
    await productValidate
      .updateProduct(value.itensSold[0].productId, product.result.name, balance);    
  }
  return { code: 422, message: 'Wrong id format'};
};

module.exports = {
  addSalesProductValidated,
  getAll,
  getById,
  updateSale,
  deleteSale,
  updateQuantity,
  // productAfterDeleteSale
};
