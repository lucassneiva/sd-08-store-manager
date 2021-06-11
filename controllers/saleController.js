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

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const saleId = await service.getById(id);

  saleId.error && next(saleId);

  res.status(OK).json(saleId);
});

const updateSale = rescue(async (req, res, next) => {
  const { id } = req.params;
  const itensSold = req.body;

  const updatedSale = await service.update(id, itensSold);
  updatedSale.error && next(updatedSale);
  res.status(OK).json(updatedSale);
});

// const deleteProduct = rescue(async (req, res, next) => {
//   const { id } = req.params;

//   const deletedProduct = await service.deleteProduct(id);

//   deletedProduct.error && next(deletedProduct);

//   res.status(OK).json(deletedProduct);
// });

  
module.exports ={
  getAllSales,
  createSales,
  getById,
  updateSale,
  // deleteProduct, 
};
