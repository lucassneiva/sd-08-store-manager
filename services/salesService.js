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

module.exports = {
  addSale
};
