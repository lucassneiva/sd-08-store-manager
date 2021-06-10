const salesModel = require('../models/sales');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sales = await salesModel.getById(id);
  return sales;
};

const create = async (bodySales) => {
  // const findByName =  await productsModel.findByName(name);
  // if (findByName) return null;
  const sales = await salesModel.create(bodySales);
  return sales;
};

// const updateById = async (id, updatedProduct) => {
//   const product = await productsModel.updateById(id, updatedProduct);
//   return product;
// };

// const deleteById = async (id) => {
//   const deletedProduct = await productsModel.getById(id);
//   await productsModel.deleteById(id);
//   return (deletedProduct);
// };

module.exports = {
  getAll,
  create,
  getById,
  // updateById,
  // deleteById,
};
