const Sales = require('../models/Sales');
const Products = require('../models/Products');

const { UNPROCESSABLE_ENTITY, NOT_FOUND } = require('./variableStatus');
const ZERO = 0;
const createSale = async (itensSold) => {

  const verifyIds = itensSold.map(({ productId }) => Products.findById(productId));
  const respVerifyIds = await Promise.all(verifyIds);
  const checkVerifyIds = respVerifyIds.includes(null);

  if (checkVerifyIds) {
    return {
      error: {
        code: UNPROCESSABLE_ENTITY,
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }

  // Referência:
  // https://github.com/cleytonoliveira/store-manager/blob/main/services/SalesService.js
  let productInStock = true;

  const verifyStock = itensSold.map(async (item) => {
    const { quantity } = await Products.findById(item.productId);

    const difference = quantity - item.quantity;

    if (difference <= ZERO) return productInStock = false;

    return await Products.subtractQuantity(item.productId, item.quantity);
  });
  await Promise.all(verifyStock);

  // ********************************************************************************
   
  if (!productInStock) {
 
    return {
      error: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell'
      }
    };
  }

  return Sales.createSale(itensSold);
};
const findAll = async () => {
  const AllProdutcs = await Sales.findAll();
  return AllProdutcs;
};
const findById = async (id) => {
  const selectId = await Sales.findById(id);
  if (!selectId) {
    return {
      error: {
        code: NOT_FOUND,
        message: 'Sale not found'
      }
    };
  }
  return selectId;
};


const updateSale = async (products) => {
  const groupItem = await Sales.updateSale(products);
  return groupItem;
};

const deleteSale = async (id) => {

  const saleID = await Sales.findById(id);

  const sale = await Sales.deleteSale(id);
  if (!sale) {
    return {
      error: {
        code: UNPROCESSABLE_ENTITY,
        message: 'Wrong sale ID format'
      }
    };
  }


  // Referência:
  // https://github.com/cleytonoliveira/store-manager/blob/main/services/SalesService.js
  saleID.itensSold.forEach(async (item) => {
    await Products.sumQuantity(item.productId, item.quantity);
  });
  // ********************************************************************************
 
  return sale;
};


module.exports = {
  createSale,
  findAll,
  findById,
  updateSale,
  deleteSale
};