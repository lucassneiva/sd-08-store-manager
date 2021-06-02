const ProductModel = require('../models/productsModel');

const INVALID_CODE = 'invalid_data';
const STOCK_PROBLEM = 'stock_problem';
const SALES_ERR_MESSAGE = 'Wrong product ID or invalid quantity';
const STOCK_ERR_MESSAGE = 'Such amount is not permitted to sell';
const ZERO = 0;

const verifySalesItens = async (itens) => {

  for (let i = ZERO; i < itens.length; i++) {
    const product = await ProductModel.getProductById(itens[i].productId);

    if (!product || typeof itens[i].quantity !== 'number' || itens[i].quantity <= ZERO) {
      return ({ code: INVALID_CODE, message: SALES_ERR_MESSAGE });
    }
  }

  return null;
};

const handleQuantitySale = async (itensSold, itens) => {

  for (let i = ZERO; i < itens.length; i++) {
    const product = await ProductModel.getProductById(itens[i].productId);
    const { _id, name, quantity } = product;
    const saleQuantity = (itensSold)
      ? itens[i].quantity - itensSold[i].quantity : itens[ i ].quantity;
    const difference = quantity - saleQuantity;

    if (difference <= ZERO) {
      return ({ code: STOCK_PROBLEM, message: STOCK_ERR_MESSAGE });
    }

    await ProductModel.updateProduct(_id, name, difference);

  }

  return null;
};

const handleQuantityReturned = async (itens) => {

  for (let i = ZERO; i < itens.length; i++) {
    const product = await ProductModel.getProductById(itens[i].productId);
    const { _id, name, quantity } = product;

    const difference = quantity + itens[ i ].quantity;

    if (difference <= ZERO) {
      return ({ code: STOCK_PROBLEM, message: STOCK_ERR_MESSAGE });
    }

    await ProductModel.updateProduct(_id, name, difference);

  }

  return null;
};

module.exports = {
  verifySalesItens,
  handleQuantitySale,
  handleQuantityReturned,
};
