const productsService = require('../services/productsServices');
const salesServices = require('../services/productsServices');

const atualizarEstoque = async(itensSold) => {
  itensSold.map(async (item) => {
    const { data } = await productsService.findById(item.productId).then((data) => data);
    const newQuantity = data.quantity - item.quantity;
    return productsService.updateByID(data._id, data.name, newQuantity);
  });
};

const atualizarEstoqueDelete = async(itensSold) => {
  itensSold.map(async (item) => {
    const { data } = await productsService.findById(item.productId).then((data) => data);
    const newQuantity = data.quantity + item.quantity;
    return productsService.updateByID(data._id, data.name, newQuantity);
  });
};

module.exports = {
  atualizarEstoque,
  atualizarEstoqueDelete
};
