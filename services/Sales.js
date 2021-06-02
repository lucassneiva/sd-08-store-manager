const { ObjectId } = require('mongodb');
const Sales = require('../models/Sales');
const Products = require('../models/Products');

const MIN_QNT = 0;

const isValid = ({ productId, quantity }, allProductsId) => {
  if (quantity <= MIN_QNT) return false;
  if (!Number.isInteger(quantity)) return false;
  if (!allProductsId.includes(productId)) return false;
  return true;
};

const add = async (soldItems) => {
  const allProductsId = await Products.getAll().then((products) =>
    products.map((product) => ObjectId(product['_id']).toString()),
  );
  const soldProductExists = soldItems.every((item) => isValid(item, allProductsId));

  if (!soldProductExists)
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };

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

module.exports = {
  add,
  getAll,
  getById,
};
