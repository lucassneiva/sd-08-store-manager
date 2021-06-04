const { ObjectId } = require('mongodb');
const { RESPONSE } = require('../config/constant/returnMessage');
const { saleModel } = require('../models');

exports.findSaleById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error(RESPONSE.SALE_NOT_FOUND);
  const sale = await saleModel.getById(id);
  if (sale) throw new Error(RESPONSE.SALE_NOT_FOUND);
};

exports.registerSale = async (entry) => {
  return await saleModel.add(entry);
};
