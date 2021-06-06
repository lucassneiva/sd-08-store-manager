const { ObjectId } = require('mongodb');

const modelProduct = require('../models/productModel');
const modelSales = require('../models/salesModel');
const schemaProduct = require('../schema/product');
const { resolveRequestSales } = require('../schema/resolveRequest');
const schemaSale = require('../schema/sales');

const searchForProductInStorage = async (productId) => modelProduct
  .getByKey({ _id: ObjectId(productId) });

const updateNowStockProduct = async (updateQuantity) => (
  modelProduct.update(updateQuantity)
);

const decreaseTheAmountOfProduct = (product, quantity) => {
  const currentQuantity = product.quantity - quantity;
  const MIN = 0;
  if (currentQuantity < MIN) {
    return false;
  }
  return { _id: product._id, quantity: currentQuantity };
};

const checkStockForNewSale = async (product) => {
  const { productId, quantity } = product;
  const getProduct =  await searchForProductInStorage(productId);
  if (!getProduct) return false;
  const thereIsProductInStock = decreaseTheAmountOfProduct(getProduct, quantity);
  if(!thereIsProductInStock) return false;
  return thereIsProductInStock;
};

const create = async (newSale) => {
  const validNewSale = schemaSale.validSale(newSale);
  if(!validNewSale) return resolveRequestSales({ sales: { err: 'create' } });
  const itensSold = await Promise.all(newSale.map(checkStockForNewSale));
  if(itensSold.every((el) => typeof el === 'object')) {
    await Promise.all(itensSold.map(updateNowStockProduct));
    const returnSaleCreated = await modelSales.create(newSale);
    return resolveRequestSales({ sales: { ok: true, result: returnSaleCreated } });
  }
  return resolveRequestSales({ sales: { err: 'create' } });
};

const getAll = async () => {
  const getAllSales = await modelSales.getAll();
  if(!getAllSales) return resolveRequestSales({sales: { err: 'get' } });
  return resolveRequestSales({ sales: { getAll: true, result: getAllSales } });
};

const getById = async (id) => {
  const getOneSale = await modelSales.getById(ObjectId(id));
  if(!getOneSale) return resolveRequestSales({sales: { err: 'get' } });
  return resolveRequestSales({ sales: { getOne: true, result: getOneSale[0] } });
};

module.exports = {
  create,
  getAll,
  getById,
};
