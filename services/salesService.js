const { ObjectId, Db } = require('mongodb');

const modelProduct = require('../models/productModel');
const modelSales = require('../models/salesModel');
const schemaProduct = require('../schema/product');
const { resolveRequestSales,
  resolveRequestSalesEsp } = require('../schema/resolveRequest');
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
    return { stock_problem: true };
  }
  return { _id: product._id, quantity: currentQuantity };
};

const checkStockForNewSale = async (product) => {
  const { productId, quantity } = product;
  const getProduct =  await searchForProductInStorage(productId);
  if (!getProduct) return false;
  const thereIsProductInStock = decreaseTheAmountOfProduct(getProduct, quantity);
  if(thereIsProductInStock.stock_problem) return thereIsProductInStock;
  return thereIsProductInStock;
};

const verifyStockForUpdate = (productQuantity, quantityCur, quantity) => {
  const total = productQuantity + quantityCur;
  if (total >= quantity) {
    const productQuantity = total - quantity;
    return { quantity: productQuantity };
  }
  return false;
};

const restoreQuantityProduct = async (itensSold) => {
  console.log(Array.isArray(itensSold));
  console.log(itensSold);
  const result = await Promise.all(itensSold.map((el) => (
    modelProduct.restoreQuantity(
      { _id: el.productId, quantity: el.quantity }
    )
  )));
  console.log(result);
  return result;
};

const create = async (newSale) => {
  const validNewSale = schemaSale.validSale(newSale);
  if(!validNewSale) return resolveRequestSales({ sales: { err: 'create' } });
  const itensSold = await Promise.all(newSale.map(checkStockForNewSale));
  if (itensSold.find((el) => el.stock_problem)) {
    return resolveRequestSalesEsp({ sales: { err: 'stock_problem' } });
  }
  if(itensSold.every((el) => typeof el === 'object')) {
    await Promise.all(itensSold.map(updateNowStockProduct));
    const returnSaleCreated = await modelSales.create(newSale);
    return resolveRequestSales({ sales: { ok: true, result: returnSaleCreated } });
  }
  return resolveRequestSales({ sales: { err: 'create' } });
};

const getAll = async () => {
  const getAllSales = await modelSales.getAll();
  if(!getAllSales) return resolveRequestSales({ sales: { err: 'get' } });
  return resolveRequestSales({ sales: { getAll: true, result: getAllSales } });
};

const getById = async (id) => {
  const getOneSale = await modelSales.getById(ObjectId(id));
  console.log(getOneSale);
  if(!getOneSale || !getOneSale.length) return resolveRequestSales(
    { sales: { err: 'get' } });
  return resolveRequestSales({ sales: { getOne: true, result: getOneSale[0] } });
};

const update = async (saleUpdate, id) => {
  if (!schemaSale.validSale(saleUpdate)) {
    return resolveRequestSales({ sales: { err: 'update' } }); 
  }
  const { productId, quantity }  = saleUpdate;
  const getSaleForUpgrade = await getById(id);
  if (getSaleForUpgrade.err) return resolveRequestSales({ sales: { err: 'update' } });
  const product = await modelProduct.getByKey(
    { _id: productId }
  );
  const { result: { itensSold } } = getSaleForUpgrade;
  const { quantity: quantityCur } = itensSold
    .find((el) => el.productId === productId); 
  const resultCount =  verifyStockForUpdate(product.quantity, quantityCur, quantity);
  if (!resultCount) return resolveRequestSales({ sales: { err: 'update' } });
  await updateNowStockProduct({ _id: productId, quantity: resultCount.quantity });
  const resultUpdateSale = await modelSales.update({ productId, quantity }, id);
  if (resultUpdateSale) {
    const getSaleNow = await getById(id); 
    return resolveRequestSales({ sales: { update: true, result:  getSaleNow.result } });
  }
  return resolveRequestSales({ sales: { err: 'update' } });
};

const deleteSale = async (id) => {
  if(!ObjectId.isValid(id)) {
    console.log('aqui');
    return resolveRequestSalesEsp({ sales: { err: 'delete' } });
  }
  const getSale = await modelSales.getById(ObjectId(id));
  console.log(getSale);
  if (!getSale || !getSale.length || !getSale[0].itensSold) {
    return resolveRequestSalesEsp({ sales: { err: 'delete' } });
  } 
  const { itensSold } = getSale[0];
  const resultRestore = await restoreQuantityProduct(itensSold);
  const resultDelete = await modelSales.deleteSale(id);
  if (!resultDelete) return resolveRequestSalesEsp({ sales: { err: 'delete' } });
  return resolveRequestSales({ sales: { ok: true, result: getSale[0] } });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteSale,
};
