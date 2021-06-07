const SalesModel = require('../models/SalesModel');
const SalesSchema = require('../schemas/SalesSchema');
const { notFoundSales, InvalidObjectIDSale } = require('../schemas/errorMessages');
const { response } = require('express');

// const ZERO = 0;

const registerSale = async (sales) => {
  const { productId, quantity } = sales[0];
  
  const validate = SalesSchema.validateEntries(quantity);

  if(validate) return validate;

  const resp = await SalesModel.updateQuantity(productId, quantity);
  if(resp.code) return resp;

  const obj = SalesSchema.newObjectFormat(sales);

  const salesInsert = await SalesModel.registerSale(obj);

  const newObj = {
    _id: salesInsert.ops[0]._id,
    itensSold: salesInsert.ops[0].itensSold,
  };
  
  return newObj;
    
};

const getAllSales = async () => {
  const sales = await SalesModel.getAllSales();

  const newObj = {
    sales: sales
  };
  return newObj;

};

const getSalesByID = async (id) => {
  const saleId = await SalesModel.getSalesByID(id);
  if(!saleId) return notFoundSales;
  return saleId[0];
};

const updateSaleByID = async (id, quantity, productId) => {
  const validate = SalesSchema.validateEntries(quantity);

  if(validate) return validate;

  const updateSale = await SalesModel.updateSaleByID(id, quantity, productId);
  return updateSale[0];
};

const deleteSaleByID = async (id) => {

  const sale = await SalesModel.getSalesByID(id);

  const saleId = await SalesModel.deleteSaleByID(id);
  
  if(!saleId) return InvalidObjectIDSale;
  
  const idProduct = sale[0].itensSold[0].productId;
  const quantity = sale[0].itensSold[0].quantity;

  SalesModel.sumQuantity(idProduct, quantity);


  return sale[0];
};

module.exports = {
  registerSale,
  getAllSales,
  getSalesByID,
  updateSaleByID,
  deleteSaleByID
};
