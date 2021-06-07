const salesModel = require('../models/salesModel');
const ProductsModel = require('../models/productModel');
const { ObjectId } = require('mongodb');

// modifiquei o nome do parametro pra ficar no padão dos outros nomes, só pra estetica ficar melhor
/*const createSale = async (itensSold) => {
  //const sale = await salesModel.createSale(itensSold);
  //await updateProduct(itensSold);
  //
  for (let item of itensSold) {
    const product = await ProductsModel.getProductById(item.productId);
    const newQuantity = product.quantity - item.quantity;
    ProductsModel.updateProduct(item.productId, {quantity: newQuantity});
    //ProductsModel.updateProduct(...item.productId, quantity: newQuantity);
  }

  return salesModel.createSale(itensSold);
  //return sale;
};*/

// modifiquei o nome do parametro pra ficar no padão dos outros nomes, só pra estetica ficar melhor
const createSale = async (itensSold) => {
  const sale = await salesModel.createSale(itensSold);
  //const productById = await ProductsModel.getProductById(item.productId);
  //await productUpdate(itensSold);
  return sale;
};

/*const createSale = async (itemSale) => {
  const sale = await salesModel.createSale(itemSale);
  return sale;
};*/

const getAllSales = async () => {
  const sale = await salesModel.getAllSales();
  return sale;
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Sale not found');
  const sale = await salesModel.getSaleById(id);

  return sale;
};

const updateSale = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong id format');
  const exist = await salesModel.getSaleById(id);
  if (!exist) throw new Error('Sale not found');
  const newSale = await salesModel.updateSale(id, itensSold);
  return newSale;
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong sale ID format');
  const exist = await salesModel.getSaleById(id);
  console.log(exist);
  if (!exist) throw new Error('Sale not found');
  await salesModel.deleteSale(id);
  return exist;
};

/*const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong sale ID format');
  const deletedSales = await salesModel.deleteSale(id);
  const saleById = await salesModel.getSaleById(id);
  if (!deletedSales) throw new Error('Wrong sale ID format');
  return saleById;
};
*/

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
