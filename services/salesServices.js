const salesModel = require('../models/salesModel');

const valid = async(sale) => {
  const err = {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    }
  };
  for(let index = 1; index <= sale.length; index += 1) {
    const { quantity } = sale[index - 1];
    if (typeof quantity === 'string' || quantity < 1){
      return err;
    }
  }
  return false;
}; 

const add = async(sale) => {

  const saleId = await salesModel.add(sale);
  if (!saleId) return null;
  return ({
    _id: saleId,
    itensSold: [...sale],
  });
};

const getAll = async () => {
  const allSales = await salesModel.getAll();
  return {sales:allSales};
};
const getById = async (id) => {
  const sales = await salesModel.getById(id);

  if (!sales)
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };

  return sales;
}; 

const updateOne = async(id,data)=>{
  await salesModel.updateOne(id,data); 
  return({
    _id:id,
    itensSold:[...data]
  });
};





module.exports =  {
  getAll,getById,add,valid,updateOne
};
