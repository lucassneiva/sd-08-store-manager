const sales = require('../models/SalesModel');
const { ObjectId } = require('mongodb');

const isValidSale = async(quantity) => {
  const zero = 0;
  if (quantity <= zero || typeof quantity !== 'number') 
    return 'Wrong product ID or invalid quantity';

  return undefined;
};

const newSale = async(sale) => {
  const notValid = await isValidSale(sale[0].quantity);

  if (notValid !== undefined) throw new Error(notValid);

  const newSales = await sales.createSale(sale);

  return newSales;

};


const getAll = async () => { 
  const sale = await sales.getAll();
  return sale;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Sale not found');
  const salesId = await sales.getById(id);
  if(!salesId) throw new Error('Sale not found');
  return salesId;
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong sale ID format');
  const excludeSales = await sales.deleteSale(id);

  return excludeSales;
};

const updateSale = async (id, sale) => {
  const notValid = await isValidSale(sale[0].quantity);

  if(notValid) {
    throw new Error(notValid);
  }
  
  const saleUpdate = await sales.updateSale(id, sale);
  return saleUpdate;
};


module.exports = {
  updateSale,
  newSale,
  getAll,
  getById,
  deleteSale,

};
