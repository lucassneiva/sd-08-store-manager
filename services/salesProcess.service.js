const { ObjectId } = require('mongodb');
const { RESPONSE } = require('../config/constant/returnMessage');
const { saleModel } = require('../models');

exports.findSaleById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error(RESPONSE.SALE_NOT_FOUND);
  const sale = await saleModel.getById(id);
  if (!sale) throw new Error(RESPONSE.SALE_NOT_FOUND);
  return sale;
};

exports.registerSale = async (entry) => {
  return await saleModel.add(entry);
};

exports.changeSale = async (id, entry) => {
  if (!ObjectId.isValid(id)) throw new Error(RESPONSE.ID_INVALID);

  const existSale = await saleModel.existById(id);
  if (!existSale) throw new Error(RESPONSE.SALE_NOT_FOUND);
  return await saleModel.update(id, entry);
};

exports.purgeSale = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error(RESPONSE.ID_SALE_INVALID);
  const existSale = await saleModel.existById(id);
  if (!existSale) throw new Error(RESPONSE.SALE_NOT_FOUND);
  const sale = await saleModel.getById(id);
  await saleModel.exclude(id);
  return sale;
};
