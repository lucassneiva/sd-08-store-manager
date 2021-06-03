const SaleModel = require('../models/Sale');
const ProductService = require('../services/Product');

const create = async (itensSold) => {
  const productPromises = itensSold.map(({ productId }) =>
    ProductService.findById(productId),
  );

  const productsId = await Promise.all(productPromises);

  const productsIdIsInvalid = productsId.some((productId) => !productId);

  if (productsIdIsInvalid) return null;

  const result = await SaleModel.create(itensSold);

  return {
    _id: result,
    itensSold,
  };
};

module.exports = {
  create,
};
