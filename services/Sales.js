const SalesModel = require('../models/Sales');
const ProductService = require('../services/Products');

const validateProducts = async (itensSold) => {
  const salesPromises = itensSold.map(({ productId }) => (
    ProductService.getById(productId)));
    
  const sales = await Promise.all(salesPromises);

  const invalidSale = sales.find((product) => product.err);

  return invalidSale;
};

const validateQuantity = async (itensSold) => {
  const quantitiesPromises = itensSold.map(async (item) => {
    const product = await ProductService.getById(item.productId);
    if (product.err) return product;
    return item.quantity <= product.quantity;
  });

  const result = await Promise.all(quantitiesPromises);

  return result.some((invalidQuantity) => !invalidQuantity); // :poop:
};

const consolidate = async (itensSold) => {
  const result = itensSold.map(async (item) => {
    const product = await ProductService.getById(item.productId);
    const updates = { quantity: product.quantity - item.quantity };
    return ProductService.edit(item.productId, updates);
  });
  
  return Promise.all(result);
};

const reduceSale = (itensSold) => {
  return itensSold.reduce((acc, item) => {
    const cur = acc.find((cur) => cur.productId === item.productId);
    if (cur) {
      cur.quantity += item.quantity;
    } else {
      acc.push({ ...item }); // goddam mutations
    }
    return acc;
  }, []);
};

const create = async (itensSold) => {
  const newSale = reduceSale(itensSold);

  const invalidProductError = await validateProducts(newSale);
  if (invalidProductError) return invalidProductError;

  const invalidQuantityError = await validateQuantity(newSale);
  if (invalidQuantityError) return {
    err: {
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell'
    }
  };

  await consolidate(itensSold);

  return SalesModel.create(itensSold);
};

const getById = async (id) => {
  const result = await SalesModel.getById(id);

  if (!result) return {
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  };

  return result;
};

const getAll = () => SalesModel.getAll();

const edit = (id, updatedSale) => SalesModel.edit(id, updatedSale);

const returnToStock = async (itensSold) => {
  const result = itensSold.map(async (item) => {
    const product = await ProductService.getById(item.productId);
    const updates = { quantity: product.quantity + item.quantity };
    return ProductService.edit(item.productId, updates);
  });

  return Promise.all(result);
};

const remove = async (id) => {
  const result = await SalesModel.remove(id);

  if (!result) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }
  };

  await returnToStock(result.itensSold);

  return result;
};

module.exports = {
  create,
  getById,
  getAll,
  edit,
  remove
};
