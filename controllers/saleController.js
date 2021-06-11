const rescue = require('express-rescue');
const service = require('../services/sale');

const OK = 200;
// const CREATED = 201;

const getAllSales = rescue(async (_req, res) => {
  const sales = await service.getAll();
  res.status(OK).json(sales);
});

const createSales = rescue(async (req, res, next) => {
  const itensSold = req.body;
  const createdSale = await service.add(itensSold);
  createdSale.error && next(createdSale);
  res.status(OK).json(createdSale);
});

// const getById = rescue(async (req, res, next) => {
//   const { id } = req.params;

//   const productId = await service.getById(id);

//   productId.error && next(productId);

//   res.status(OK).json(productId);
// });

// const updateProduct = rescue(async (req, res, next) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;

//   const updatedProduct = await service.update(id, name, quantity);
//   updatedProduct.error && next(updatedProduct);
//   res.status(OK).json(updatedProduct);
// });

// const deleteProduct = rescue(async (req, res, next) => {
//   const { id } = req.params;

//   const deletedProduct = await service.deleteProduct(id);

//   deletedProduct.error && next(deletedProduct);

//   res.status(OK).json(deletedProduct);
// });

  
module.exports ={
  getAllSales,
  createSales,
  // getById,
  // updateProduct,
  // deleteProduct, 
};
