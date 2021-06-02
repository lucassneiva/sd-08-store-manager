const connection = require('./connection');
const saveMe = require('../utils/saveMe');
const ProductsService = require('../services/Products');

const create = saveMe(async (itensSold) => {
  const db = await connection();
  const productsPromises = itensSold.map(({ _id }) => ProductsService.getById(_id));
  const products = await Promise.all(productsPromises);
  const hasInvalidProducts = products.some((product) => !Boolean(product));
  if (hasInvalidProducts) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    }
  };
  const { insertedId } = await db.collection('sales').insertMany(itensSold);
  return { insertedId, itensSold };
});

module.exports = {
  create
};
