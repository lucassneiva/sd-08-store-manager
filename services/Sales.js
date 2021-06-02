const SalesModel = require('../models/Sales');
const ProductService = require('../services/Products');

const create = async (itensSold) => {
  const salesPromises = itensSold.map(({ productId }) => (
    ProductService.getById(productId)));
    
  const sales = await Promise.all(salesPromises);

  const invalidSale = sales.find((product) => product.err);

  if (invalidSale) return invalidSale;

  return SalesModel.create(itensSold);
};

const getById = async (id) => {
  const result = await SalesModel.getById(id);

  if (!result) return {
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  };

  return result;
};

const getAll = () => SalesModel.getAll();

module.exports = {
  create,
  getById,
  getAll
};
