const SaleModel = require('../models/Sale');
const ProductService = require('../services/Product');

const create = async (itensSold) => {
  const productPromises = itensSold.map(({ productId }) =>
    ProductService.findById(productId),
  );

  const productsId = await Promise.all(productPromises);

  const productsIdIsInvalid = productsId.some((productId) => !productId);

  if (productsIdIsInvalid) return null;

  const _id = await SaleModel.create(itensSold);

  return { _id, itensSold };
};

const getAll = async () => SaleModel.getAll();

const findById = async (id) => {
  const sale = await SaleModel.findById(id);

  if (!sale) return null;

  return sale;
};

module.exports = {
  create,
  getAll,
  findById,
};
