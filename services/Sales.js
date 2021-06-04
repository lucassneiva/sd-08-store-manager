const Sales = require('../models/Sales');
const { status, message, code } = require('../schema/status');

const register = async (itensSold) => {
  const registerSale = await Sales.register(itensSold);
  return registerSale;
};

const findAll = async () => {
  const soldProducts = await Sales.findAll();
  return ({ sales: soldProducts });
};

const findById = async (id) => {
  const soldProductsById = await Sales.findById(id);
  return soldProductsById;
};

module.exports = {
  register,
  findAll,
  findById,
};
