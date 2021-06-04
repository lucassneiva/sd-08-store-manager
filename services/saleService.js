const SaleModel = require('../models/saleModel');
const SaleValidation = require('./saleValidation');
const ProductModel = require('../models/produtcModel');

const updateStock = async (products, verb) => {
  for (const product of products) {
    const productFound = await ProductModel.findById(product.productId);
    if (verb === 'delete') {
      productFound.quantity += product.quantity;
    } else if (verb === 'post') {
      productFound.quantity -= product.quantity;
    }
    const { _id, name, quantity } = productFound;
    await ProductModel.update(_id, { name, quantity });
  }
};

const create = async (products) => {
  await SaleValidation.prductsValidations(products);

  const sale = await SaleModel.create(products);

  await updateStock(products, 'post');

  return sale;
};

const getAll = async () => {
  const salesData = await SaleModel.getAll();

  return {
    sales: salesData,
  };
};

const findById = async (id) => {
  SaleValidation.validateSaleId(id);
  
  const saleData = await SaleModel.findById(id);
  
  await SaleValidation.validateSaleNotFound(saleData);
  
  return saleData;
};

const update = async (id, newProducts) => {
  SaleValidation.validateUpdateSaleId(id);
  await SaleValidation.prductsValidations(newProducts);

  return await SaleModel.update(id, newProducts);
};

const exclude = async (id) => {
  SaleValidation.validateUpdateSaleId(id);
  
  const SaleDataDeleted = await SaleModel.exclude(id);

  const { itensSold } = SaleDataDeleted;

  await updateStock(itensSold, 'delete');
  
  return SaleDataDeleted;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  exclude,
};
