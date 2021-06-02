const salesModel = require('../models/Sales');
const salesSchema = require('../Schemas/SalesValidator');

const createSales = async (salesArr) =>  {
  const validate = await salesSchema.salesValidator(salesArr);
  if(validate.err) return validate;    
  const data = await salesModel.createSales(salesArr);
  return ({data});
};


const getAll = async () => {
  const products = await salesModel.getAll();
  return products;
};

const findById = async (id) => {
  const data = await salesModel.findById(id);
  if(data===null) return {err:{
    code:'not_found',
    message:'Sale not found'
  }
  };

  return {data};
};

const updateSales = async(id, {salesArr}) => {
  const validation =  salesSchema.salesValidator(salesArr);
  if(validation.err) return validation;
  const data = await salesModel.updateSales(id, {salesArr});
  return {data}; 
};



const deleteSale = async(id) => {
  const data = await salesModel.findById(id);
  if(data===null) return {err:{
    code:'invalid_data',
    message:'Wrong sale ID format'
  }
  };

  const info = await salesModel.deleteSale(id);
  return {info};
};

 
module.exports = {
  createSales,
  findById, 
  getAll,
  updateSales,
  deleteSale

};