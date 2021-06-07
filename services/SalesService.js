const Sale = require('../models/Sale');

const getAll = async() => await Sale.getAll();

const findById = async(id) => await Sale.findById(id);

const register = async(sale) => await Sale.register(sale);

const update = async(id, productId, quantity) => await Sale.update(
  id, productId, quantity);

const remove = async(id) => await Sale.remove(id);

module.exports = {
  getAll,
  findById,
  register,
  update,
  remove,
};
