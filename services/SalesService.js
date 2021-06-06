const SalesModel = require('../models/SalesModel');
const SalesSchema = require('../schemas/SalesSchema');
const { notFoundSales } = require('../schemas/errorMessages');

// const ZERO = 0;

const registerSale = async (sales) => {
  const { quantity } = sales[0];
    
  const validate = SalesSchema.validateEntries(quantity);

  if(validate) return validate;

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

module.exports = {
  registerSale,
  getAllSales,
  getSalesByID,
};
