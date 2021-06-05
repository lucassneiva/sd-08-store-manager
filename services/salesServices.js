const { ObjectID, ObjectId } = require('mongodb');
const { productsModel } = require('../models');
const {
  findProductById,
  getProductToUpdate,
  updateProductByIdDelete,
  findAllProducts,
} = productsModel;
const { salesModel } = require('../models');
const {
  addSales,
  findAllSales,
  findSalesById,
  getSalesToUpdate,
  deleteById,
} = salesModel;

const CODE = 'invalid_data';
const QTD = 0;

const readSales = async () => {
  const data = await findAllSales();
  return data;
};

const createSales = async (itensSold) => {
  const validation = await checkItensSold(itensSold);
  if (validation.err) return validation;

  for (let index in itensSold) {
    const product = await findProductById(itensSold[index].productId);
    const newQuantity = product.quantity - itensSold[index].quantity;
    if (newQuantity <= QTD) return {
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      },
    };
    getProductToUpdate(itensSold[index].productId,
      itensSold[index].name,
      newQuantity,
    );
  }

  const newSales = await addSales(itensSold);
  return { _id: newSales.insertedId, itensSold };
};

const checkItensSold = async (itensSold) => {
  const QTD = 0;
  
  for (const index in itensSold) {
    if (itensSold[index].quantity <= QTD
      || typeof(itensSold[index].quantity) !== 'number') {
      return {
        err: {
          code: CODE,
          message: 'Wrong product ID or invalid quantity',
        }
      };
    }
  }
  
  return true;
};

const readSalesById = async (id) => {
  const result = await findSalesById(id);
  if (!result) return {
    err: {
      code: 'not_found',
      message: 'Sale not found',
    }
  };
  return result;
};

const updateSalesById = async (id, itensSold) => {
  const validation = await checkItensSold(itensSold);
  if (validation.err) return validation;

  await getSalesToUpdate(id, itensSold);
  return { _id: id, itensSold };
};

const deleteSalesById = async (id) => {
  const validation = await salesNFVF(id);
  if (validation.err) return validation;

  const sales = await deleteById(id);
  return sales;
};

const salesNFVF = async (id) => {
  const sales = await findSalesById(id);
  if (!ObjectID.isValid(id)) return {
    err: {
      code: CODE,
      message: 'Wrong sale ID format',
    }
  };
  if (!sales) return {
    err: {
      code: CODE,
      message: 'Sales not found',
    }
  };

  const { itensSold } = sales;
  
  for (let index in itensSold) {
    const product = await findProductById(itensSold[index].productId);
    console.log(product);
    const newQuantity = product.quantity + itensSold[index].quantity;
    await updateProductByIdDelete(itensSold[index].productId, newQuantity);
    const teste = await findAllProducts();
    console.log(teste);
  }

  return sales;
};

module.exports = {
  readSales,
  createSales,
  readSalesById,
  updateSalesById,
  deleteSalesById,
};