const { ObjectId } = require('mongodb');
const Sales = require('../models/salesModels');
const Products = require('../models/productsModels');
const Helper = require('../helpers');

const MIN_QTD = 0;

const getAllSales = async () => {
  const allSales = await Sales.getAllSales();
  return { sales: allSales };
};

const getSaleById = async (id) => {
  const notFound = {
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  };

  if (!ObjectId.isValid(id)) return notFound;

  const saleById = await Sales.getSaleById(id);
  if (!saleById) return notFound;

  return saleById;
};

const addSale = async (sales) => {
  const quantityArray = sales.map((sale) => Helper.saleValid(sale.quantity));
  if (quantityArray.find((soldItem) => soldItem.err)) {
    return quantityArray.find((invalidItem) => invalidItem.err);
  }

  for (let item of sales) {
    const product = await Products.getProductById(item.productId);
    console.log(item.quantity);
    const updatedQuantity = product.quantity - item.quantity;
    if (updatedQuantity < MIN_QTD) {
      return {
        err: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell',
        },
      };
    }
    await Products.updateProduct(
      product.productId,
      product.name,
      { quantity: updatedQuantity }
    );
  }

  return await Sales.addSale(sales);
};

const updateSale = async (id, productId, quantity) => {
  const saleValidation = Helper.saleValid(quantity);
  if (saleValidation.err) return saleValidation;

  const product = await Products.getProductById(productId);
  const updatedQuantity = product.quantity - quantity;
  if (updatedQuantity < MIN_QTD) {
    return {
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      },
    };
  }
  await Products.updateProduct(
    product.productId,
    product.name,
    { quantity: updatedQuantity }
  );

  await Sales.updateSale(id, productId, quantity);
  return { _id: id, itensSold: [{ productId, quantity }] };
};

const deleteSale = async (id) => {
  const wrongSaleId = {
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    },
  };
  if (!ObjectId.isValid(id)) return wrongSaleId;

  const sale = await Sales.getSaleById(id);
  const { itensSold } = sale;

  for (let item of itensSold) {
    const product = await Products.getProductById(item.productId);
    const updatedQuantity = product.quantity + item.quantity;
    await Products.updateProduct(
      product.productId,
      product.name,
      { quantity: updatedQuantity }
    );
  }

  const deletedSale = await Sales.deleteSale(id);
  if (!deletedSale) return wrongSaleId;

  return deletedSale;
};

module.exports = {
  getAllSales,
  getSaleById,
  addSale,
  updateSale,
  deleteSale,
};
