const sales = require('../model/sales');
const { ObjectId } = require('mongodb');

// const { ObjectId } = require('mongodb');

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
  const existingSales = await sales.getAll();
  return existingSales;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Sale not found');
  const salesId = await sales.getById(id);
  if(!salesId) throw new Error('Sale not found');
  // console.log(productId);
  return salesId;
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong sale ID format');
  const excludeSales = await sales.exclude(id);
  // console.log(excludeSales);
    
  return excludeSales;
};

const update = async (id, sale) => {
  const notValid = await isValidSale(sale[0].quantity);
  if(notValid) {
    throw new Error(notValid);
  }
  const saleUpdate = await sales.update(id, sale);
  return saleUpdate;
};


module.exports = {
  update,
  newSale,
  getAll,
  getById,
  exclude,
  
};
