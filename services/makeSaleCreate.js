const update = require('../models/update');
const ZERO = 0;
const msgError = {err:
    { code: 'stock_problem', 
      message: 'Such amount is not permitted to sell' },};
const ERRO = 404;
const makeSale = async (data, idList, productObject) => {
  data.forEach(async Product => {
    const index = idList.indexOf(Product.productId);
    console.log('################# MAKE SALES  #####################');
    console.log('id: '+idList[index]);
    console.log(data[index]);
    console.log(data[index].quantity);
    console.log(productObject[index].quantity);
    console.log(productObject[index].quantity - data[index].quantity);
    console.log(productObject[index].name);
    console.log(productObject[index]._id);
    console.log(idList[index]);
    console.log(Product.productId);
    // if (productObject[index].quantity - data[index].quantity === ZERO){
    //   await deleteDB(Product.productId ,'sales');
    // } else {
    console.log(productObject[index]);
    productObject[index].quantity = productObject[index].quantity - data[index].quantity;
    console.log('------------------------------------------');
    console.log(productObject[index]);
    
    await update(
      Product.productId ,
      'products', 
      productObject[index]
    );
    // }
  });
};
module.exports = makeSale;