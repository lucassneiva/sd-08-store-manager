const SalesModel = require('../models/Sales');

const create = (itensSold) => SalesModel.create(itensSold);

module.exports = {
  create
};
