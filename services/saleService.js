const saleModel = require('../models/saleModel');
const productModel = require('../models/productModel');

const getAll = async () => {
  const sales = await saleModel.getAll();
  return sales;
};

const add = async (newSale) => {
  
  
  // const findNameProduct = await newSale.map(item => 
  //   productModel.getById(item.productId)
  //   );
    
  //   console.log(findNameProduct);
  // await productModel.getById(productId);
  // if (findNameProduct) {
  //   const addedSale = await saleModel.add(newSale);
  //   return addedSale;
  // }
  return  await saleModel.add(newSale);
};

const getById = async (id) => {
  const sale = await saleModel.getById(id);
  return sale;
};

const update = async (id, newSale) => {
  const product = await saleModel.update(id, newSale);
  return product;
};

const exclude = async (id) => {
  const deletedSale = await saleModel.getById(id);
  await saleModel.exclude(id);
  return deletedSale;
};

module.exports = {
  getAll,
  add,
  getById,
  update,
  exclude,
};
