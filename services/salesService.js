const { ObjectId } = require('mongodb');

const modelProduct = require('../models/productModel');
const modelSales = require('../models/salesModel');
const schemaProduct = require('../schema/product');
const resolveRequest = require('../schema/resolveRequest');
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
  if(!validNewSale) return resolveRequest({ sales: { err: true } });
  const itensSold = await Promise.all(newSale.map(checkStockForNewSale));
  if(itensSold.every((el) => typeof el === 'object')) {
    await Promise.all(itensSold.map(updateNowStockProduct));
    const returnSaleCreated = await modelSales.create(newSale);
    return resolveRequest({ sales: { ok: true, result: returnSaleCreated } });
  }
  return resolveRequest({ sales: { err: true } });
};

module.exports = {
  create,
};
