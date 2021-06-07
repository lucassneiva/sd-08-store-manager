const joi = require('@hapi/joi');
const Sale = require('../models/Sale');
const productStock = require('../models/Product');

const zeroStock = 0;

const HTTP_Unprocessable_Entity = 422;
const HTTP_Not_Found = 404;
const MIN_QUANTITY = 1;

// https://stackoverflow.com/questions/42656549/joi-validation-of-array
const schema = joi.array().items({
  productId: joi
    .string()
    .required(),
  quantity: joi
    .number()
    .min(MIN_QUANTITY)
    .required(),
});

const getAll = async () => {
  const allSales = await Sale.getAll();

  if (allSales === null) {
    return {
      code: 'not_found',
      error: { message: 'Sale not found' },
      status: HTTP_Not_Found
    };
  }

  return allSales;
};

const findById = async (id) => {
  const saleID = await Sale.findById(id);

  if (!saleID) {
    return {
      code: 'not_found',
      error: { message: 'Sale not found' },
      status: HTTP_Not_Found
    };
  }

  return saleID;
};

const create = async (items) => {
  const { error } = schema.validate(items);

  if (error) { 
    return {
      code: 'invalid_data',
      error: { message: 'Wrong product ID or invalid quantity' },
      status: HTTP_Unprocessable_Entity
    };
  };

  // items.forEach(async (item) => {
  //   await productStock.subtractQuantity(item.productId, item.quantity);
  // });

  // ********************************************************************************
  // Referência:
  // https://github.com/cleytonoliveira/store-manager/blob/main/services/SalesService.js
  let productInStock = true;

  const verifyStock = items.map(async (item) => {
    const { quantity } = await productStock.findById(item.productId);
  
    const difference = quantity - item.quantity;
  
    if (difference <= zeroStock) return productInStock = false;
 
    return await productStock.subtractQuantity(item.productId, item.quantity);
  });
  
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  // Se qualquer uma das promises passadas for rejeitada, 'Promise.all' assíncronamente é rejeitada
  // com o valor da promise rejeitada, independentemente se outras promises foram resolvidas.
  await Promise.all(verifyStock);
  
  if (!productInStock) {
    return {
      code: 'stock_problem',
      error: { message: 'Such amount is not permitted to sell' },
      status: HTTP_Not_Found
    };
  }
  // ********************************************************************************

  const newSale = await Sale.create(items);

  return newSale;
};

const update = async (id, items) => {
  const { error } = schema.validate(items);

  if (error) { 
    return {
      code: 'invalid_data',
      error: { message: 'Wrong product ID or invalid quantity' },
      status: HTTP_Unprocessable_Entity
    };
  };

  const updateSale = await Sale.update(id, items);

  return updateSale;
};

const exclude = async (id) => {
  const saleID = await Sale.findById(id);

  if (!saleID) {
    return {
      code: 'invalid_data',
      error: { message: 'Wrong sale ID format' },
      status: HTTP_Unprocessable_Entity
    };
  }

  saleID.itensSold.forEach(async (item) => {
    await productStock.sumQuantity(item.productId, item.quantity);
  });

  const excludeSale = await Sale.exclude(id);

  return excludeSale;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
};