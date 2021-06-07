const SaleModel = require('../models/Sale');
const ProductService = require('../services/Product');

const ZERO = 0;

const updateSaleProduct = async (itensSold, op) => {
  const updated = itensSold.map(async (item) => {
    const product = await ProductService.findById(item.productId);
    const quantity = op ? item.quantity : -item.quantity;
    const update = { quantity: product.quantity + quantity };
    return ProductService.update(item.productId, update);
  });

  return Promise.all(updated);
};

const verifySale = async (itensSold) => {
  const updated = itensSold.map(async (item) => {
    const product = await ProductService.findById(item.productId);
    return product.quantity - item.quantity >= ZERO;
  });

  const result = await Promise.all(updated);
  return result.some((cur) => !cur);
};

const create = async (itensSold) => {
  const productPromises = itensSold.map(({ productId }) =>
    ProductService.findById(productId),
  );

  const productsId = await Promise.all(productPromises);

  const productsIdIsInvalid = productsId.some((productId) => !productId);

  if (productsIdIsInvalid) return null;

  const _id = await SaleModel.create(itensSold);

  const quantityInvalid = await verifySale(itensSold);
  if (quantityInvalid) return 'Insufficient quantity for sale';

  await updateSaleProduct(itensSold);

  return { _id, itensSold };
};

const getAll = async () => SaleModel.getAll();

const findById = async (id) => {
  const sale = await SaleModel.findById(id);

  if (!sale) return null;

  return sale;
};

const update = async (id, updateSale) => {
  const updatedSale = await SaleModel.update(id, updateSale);

  if (!updatedSale) return null;

  return { _id: id, itensSold: updateSale };
};

const remove = async (id) => {
  const sale = await SaleModel.findById(id);
  if (!sale) return null;

  await updateSaleProduct(sale.itensSold, 'subtract');

  return SaleModel.remove(id);
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove,
};
