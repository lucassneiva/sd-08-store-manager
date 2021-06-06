const sales = require('../model/salesModel');

async function addSale(req){
  const data = await sales.addSale(req);
  if(!data) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'}
  };
  return data;
}

async function getAll(req){
  const { id } = req.params;
  const data = await sales.getAll(req);
  if(!id) return data;
  if(!data) return {
    err: {
      code: 'not_found',
      message: 'Sale not found'}
  };
  return data;
}

async function updateSale(req){
  const data = await sales.updateSale(req);
  if(!data){
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }
  return data;
}

async function deleteSale(id){
  const data = await sales.deleteSale(id);
  if(!data){
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    };
  }
  return data;
}

module.exports = {
  addSale, getAll, updateSale, deleteSale
};
