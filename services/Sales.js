const Sales = require('../models/Sales');

const create = async (products) => await Sales.create(products);

module.exports = {
  create,
};
