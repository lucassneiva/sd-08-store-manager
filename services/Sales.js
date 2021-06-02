const { ObjectId } = require('mongodb');
const Sales = require('../models/Sales');
const Products = require('../models/Products');

const MIN_QNT = 0;

const isValid = async (soldItems) => {
  const allProductsId = await Products.getAll().then((products) =>
    products.map((product) => ObjectId(product['_id']).toString()),
  );
  const soldProductExists = soldItems.every(
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

const add = async (soldItems) => {
  const validation = await isValid(soldItems);
  if (validation.err) return validation;

  return Sales.add(soldItems);
};

const getAll = async () => {
  const sales = await Sales.getAll();

  return { sales };
};

const getById = async (id) => {
  const sales = await Sales.getById(id);

  if (!sales)
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };

  return sales;
};

const updateById = async (id, updatedSale) => {
  const validation = await isValid(updatedSale);
  if (validation.err) return validation;
  const result = await Sales.updateById(id, updatedSale);

  if (!result.matchedCount) return {
    err: {
      code: 'not_found',
      message: 'Id not found',
    },
  };

  return {
    _id: id,
    itensSold: updatedSale,
  };
};

module.exports = {
  add,
  getAll,
  getById,
  updateById,
};
