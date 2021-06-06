const Sale = require('../models/Sale');

const getAll = async() => await Sale.getAll();

const register = async(sale) => await Sale.register(sale);

module.exports = {
  getAll,
  register,
};
