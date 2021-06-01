const ProductModel = require('../models/productsModel');

const INVALID_CODE = 'invalid_data';
const SALES_ERR_MESSAGE = 'Wrong product ID or invalid quantity';

const verifySalesItens = async (itens) => {
  const ZERO = 0;

  for (let i = ZERO; i < itens.length; i++) {
    const product = await ProductModel.getProductById(itens[ i ].productId);

    if (!product || typeof itens[i].quantity !== 'number' || itens[i].quantity <= ZERO) {
      return ({ code: INVALID_CODE, message: SALES_ERR_MESSAGE });
    }
  }

  return null;
};

module.exports = {
  verifySalesItens,
};
