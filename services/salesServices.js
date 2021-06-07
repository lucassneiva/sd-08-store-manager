const salesModel = require('../models/salesModel');
const productsServices = require('../services/productsServices');
const { ObjectId } = require('mongodb');

// modifiquei o nome do parametro pra ficar no padão dos outros nomes, só pra estetica ficar melhor
const createSale = async (itensSold) => {
  itensSold.forEach(async (product) =>
    await productsServices.subQuantityProduct(product.productId, product.quantity));
  const sale = await salesModel.createSale(itensSold);
  return sale;
};

const getAllSales = async () => {
  const sale = await salesModel.getAllSales();
  return sale;
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Sale not found');
  const saleExist = await salesModel.getSaleById(id);
  if(!saleExist) throw new Error('Sale not found');
  const sale = await salesModel.getSaleById(id);
  console.log('getSaleById', sale);
  return sale;
};

const updateSale = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong id format');
  const exist = await salesModel.getSaleById(id);
  if (!exist) throw new Error('Sale not found');
  const newSale = await salesModel.updateSale(id, itensSold);
  return newSale;
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong sale ID format');
  const exist = await salesModel.getSaleById(id);
  console.log('deleteSale', exist);
  if (!exist) throw new Error('Sale not found');
  exist.itensSold.forEach(async (product) => {
    await productsServices.addQuantityProduct(product.productId, product.quantity);
  }); // implementei a atualização da quantidade, foi feita em conjunto com o Ediberto
  await salesModel.deleteSale(id);
  return exist;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
