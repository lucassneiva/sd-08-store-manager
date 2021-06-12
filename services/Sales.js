const Sales = require('../models/Sales');
const Products = require('../models/Products');

const create = async (itensSold) => {
  const productsPromises = itensSold.map(({ productId }) => Products.findById(productId));

  const products = await Promise.all(productsPromises);

  const productNotFound = products.some(product => !product);

  if (productNotFound) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }

  for (let item of itensSold) {
    const { quantity, productId } = item;

    const product = await Products.findById(productId);

    const { quantity: stockQuantity } = product;

    const diffQuantity = stockQuantity - quantity;

    if (diffQuantity < +'0') {
      return {
        error: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell'
        }
      };
    }

    await Products.update({
      id: productId,
      product: { ...product, quantity: diffQuantity }
    });
  }

  return Sales.create(itensSold);
};

const findAll = async () => Sales.findAll();

const findById = async (id) => {
  const sale = await Sales.findById(id);

  if (!sale) {
    return {
      error: {
        code: 'not_found',
        message: 'Sale not found'
      }
    };
  }

  return sale;
};

const update = async (sale) => Sales.update(sale);

const remove = async (id) => {
  const saleExists = await Sales.findById(id);

  if (!saleExists) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    };
  }

  const { itensSold } = saleExists;

  for (let item of itensSold) {
    const { quantity, productId } = item;

    const product = await Products.findById(productId);

    const { quantity: stockQuantity } = product;

    await Products.update({
      id: productId,
      product: { ...product, quantity: stockQuantity + quantity }
    });
  }

  return Sales.remove(id);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove
};