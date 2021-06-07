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

const verifyStockForUpdate = (productQuantity, quantityCur, quantity) => {
  const total = productQuantity + quantityCur;
  if (total >= quantity) {
    const productQuantity = total - quantity;
    return { quantity: productQuantity };
  }
  return false;
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
  if(!getAllSales) return resolveRequestSales({ sales: { err: 'get' } });
  return resolveRequestSales({ sales: { getAll: true, result: getAllSales } });
};

const getById = async (id) => {
  const getOneSale = await modelSales.getById(ObjectId(id));
  if(!getOneSale) return resolveRequestSales({ sales: { err: 'get' } });
  return resolveRequestSales({ sales: { getOne: true, result: getOneSale[0] } });
};

const update = async (saleUpdate, id) => {
  //valida schema
  if (!schemaSale.validSale(saleUpdate)) {
    return resolveRequestSales({ sales: { err: 'update' } }); 
  }

  // quantidade e id para update
  const { productId, quantity }  = saleUpdate;

  // verifica se existe a venda
  const getSaleForUpgrade = await getById(id);
  if (getSaleForUpgrade.err) return resolveRequestSales({ sales: { err: 'update' } });

  // busca o produto que vai receber att na quantidade
  const product = await modelProduct.getByKey(
    { _id: productId }
  );
  // desestruturando a venda para retirar a quantidade ja vendida
  const { result: { itensSold } } = getSaleForUpgrade;
  const { quantity: quantityCur } = itensSold
    .find((el) => el.productId === productId); 

  // calcula se é possível atualizar a venda
  const resultCount =  verifyStockForUpdate(product.quantity, quantityCur, quantity);
  if (!resultCount) return resolveRequestSales({ sales: { err: 'update' } });

  // atualiza o produto
  await updateNowStockProduct({ _id: productId, quantity: resultCount.quantity });
  // atualiza a venda
  const resultUpdateSale = await modelSales.update({ productId, quantity }, id);
  // resultado
  if (resultUpdateSale) {
    const getSaleNow = await getById(id); 
    return resolveRequestSales({ sales: { update: true, result:  getSaleNow.result } });
  }
  return resolveRequestSales({ sales: { err: 'update' } });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
