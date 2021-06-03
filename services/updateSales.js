const updateDB = require('../models/update');
const validateQuantity = require('./validateQuantity');
const read = require('../models/read');
const HTTP_OK_STATUS = 200;
const msgError = {err:
  { code: 'invalid_data', 
    message: 'Wrong product ID or invalid quantity' },};
const updateSales = async ( saleId ,data, res , next)=>{
  console.log('UPDATE SALES');
  console.log(data);
  const {quantity , productId} = data[0];
  console.log(quantity);
  let result = {};
  result = validateQuantity(quantity, res ,msgError,msgError);
  if(result === {} ) { res = result ; next();}
  saleDetalils = await read.findById('sales',saleId);
  console.log('BUSCANDO A COMPRA A SER ALTERADA');
  console.log(saleDetalils.itensSold);
  const iqualId = (a)=>{
    if(a.productId === productId){
      return a;
    }
  };
  const index = saleDetalils.itensSold.findIndex(iqualId);
  // https://www.w3schools.com/jsref/jsref_findindex.asp#:~:text=The%20findIndex()%20method%20executes,Otherwise%20it%20returns%20-1
  console.log(index);
  console.log(saleDetalils.itensSold[index]);
  saleDetalils.itensSold[index].quantity = quantity;
  result =  await updateDB(saleId ,'sales', saleDetalils);
  res.status(HTTP_OK_STATUS).json(result);
  next();
};
module.exports = updateSales;