const { ObjectId } = require('mongodb');
const Sales = require('../models/Sales');
const Products = require('../models/Products');

const MIN_QNT = 0;

const isValid = async (itensSold) => {
  const allProductsId = await Products.getAll().then((products) =>
    products.map((product) => ObjectId(product['_id']).toString()),
  );
  const soldProductExists = itensSold.every(
    ({ quantity, productId }) =>
      !(
        quantity <= MIN_QNT
        || !Number.isInteger(quantity)
        || !allProductsId.includes(productId)
      ),
  );
  if (!soldProductExists)
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };

  return 'validated';
};

const add = async (itensSold) => {
  const validation = await isValid(itensSold);
  if (validation.err) return validation;

  for (let item of itensSold) {
    const product = await Products.getById(item.productId);
    const newQuantity = product.quantity - item.quantity;
    if (newQuantity <= MIN_QNT) return {
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      },
    };
    Products.updateById(item.productId, {quantity: newQuantity});
  }

  return Sales.add(itensSold);
};

const getAll = async () => {
  const sales = await Sales.getAll();
  return { sales };
};

const getById = async (id) => {
  const errNotFound = {
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  };
  if (!ObjectId.isValid(id)) return errNotFound;

  const sales = await Sales.getById(id);
  
  if (!sales) return errNotFound;

  return sales;
};

const updateById = async (id, updatedSale) => {
  const validation = await isValid(updatedSale);
  if (validation.err) return validation;
  if (!ObjectId.isValid(id)) return {
    err: {
      code: 'not_found',
      message: 'Id not found',
    },
  };
  
  await Sales.updateById(id, updatedSale);

  return {
    _id: id,
    itensSold: updatedSale,
  };
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    },
  };
  const deletedSale = await Sales.getById(id);
  await Sales.deleteById(id);
  const { itensSold } = deletedSale;

  for (let item of itensSold) {
    const product = await Products.getById(item.productId);
    const newQuantity = product.quantity + item.quantity;
    Products.updateById(item.productId, {quantity: newQuantity});
  }

  return deletedSale;
};

module.exports = {
  add,
  getAll,
  getById,
  updateById,
  deleteById,
};
