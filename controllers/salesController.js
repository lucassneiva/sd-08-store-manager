const salesService = require('../services/salesService');
const productService = require('../services/productService');
const { ObjectId } = require('mongodb');

// const CREATED_STATUS = 201;
const OK_STATUS = 200;
const NOT_FOUND_STATUS = 404;
const FIRST_INDEX = 0;
const MIN_QUANTITY = 0;

const create = async (req, res) => {
  const sales = req.body;
  const productsToUpdate = [];
  for (let index = FIRST_INDEX; index < sales.length; index += 1) {
    const { productId, quantity: soldQuantity } = sales[index];
    const productObjectId = ObjectId(productId);
    const { name, quantity } = await productService.getProductById(productObjectId);
    const newQuantity = quantity - soldQuantity;

    if (newQuantity < MIN_QUANTITY) {
      return res.status(NOT_FOUND_STATUS).json({
        err: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell',
        },
      });
    }

    productsToUpdate.push({ productObjectId, name, soldQuantity });
  }

  for (let index = FIRST_INDEX; index < productsToUpdate.length; index += 1) {
    const { productObjectId, name, soldQuantity } = productsToUpdate[index];
    const { quantity } = await productService.getProductById(productObjectId);
    await productService.updateProduct(productObjectId, name, quantity - soldQuantity);
  }

  const createdSales = await salesService.create(sales);
  return res.status(OK_STATUS).json(createdSales);
};

const getAllSales = async (_req, res) => {
  const allSales = await salesService.getAllSales();
  return res.status(OK_STATUS).json(allSales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);
  if (sale) {
    return res.status(OK_STATUS).json(sale);
  }
  return res.status(NOT_FOUND_STATUS).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  });
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updatedSale = await salesService.updateSale(id, data);
  return res.status(OK_STATUS).json(updatedSale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const deletedSale = salesService.deleteSale(id);
  return res.status(OK_STATUS).json(deletedSale);
};

module.exports = {
  create,
  deleteSale,
  getAllSales,
  getSaleById,
  updateSale,
};
