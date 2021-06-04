const update = require('../models/update');
const makeSale = async (id, idList, productObject,quantity) => {
  const index = idList.indexOf(id);
  console.log('################# DELETE SALES  #####################');
  console.log(id);
  console.log(idList);
  console.log(productObject);
  console.log('id: '+idList[index]);
  console.log(productObject[index].quantity);
  console.log(productObject[index].quantity + quantity);
  console.log(productObject[index].name);
  console.log(productObject[index]._id);
  console.log(idList[index]);
  // if (productObject[index].quantity - data[index].quantity === ZERO){
  //   await deleteDB(Product.productId ,'sales');
  // } else {
  console.log(productObject[index]);
  productObject[index].quantity = productObject[index].quantity + quantity;
  console.log('------------------------------------------');
  console.log(productObject[index]);
  await update(
    id ,
    'products', 
    productObject[index]
  );
  // }
};
module.exports = makeSale;