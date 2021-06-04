const deleteDB = require('../models/delete');
const readDB = require('../models/read');
const makeSale = require('./makeSaleDelete');
const validateId = require('./validateIdSync');
const HTTP_OK_STATUS = 200;
const ERRO = 422;
const msgError = {err:
  { code: 'invalid_data', 
    message: 'Wrong sale ID format' },};
const deleteSales = async ( id , res , next)=>{
  let result = {};
  result = await validateId(id, res, msgError);
  if(res.statusCode!==ERRO){  
    let idList = await readDB.listByValue('products', '_id');
    idList =idList.map(String);
    const productObject = await readDB.getAll('products');
    const listSales = await readDB.findById('sales', id);
    console.log('-------------------- --------- - - ------------ - --');
    console.log(listSales);
    console.log('-------------------- --------- - - ------------ - --');
    listSales.itensSold.forEach(async Product => {
      console.log('___DELETE_____');
      console.log(Product);
      await makeSale(Product.productId, idList, productObject, Product.quantity);
    });
    result =  await deleteDB(id ,'sales');
    res.status(HTTP_OK_STATUS).json(result);
    next();
  }
};

module.exports = deleteSales;