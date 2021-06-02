const SalesModel = require('../models/salesModel');
const ProductsModel = require('../models/productsModel');

const ZERO = 0;

const productsValidation = async (sale) => {
  // Uso da função Promise.all, para aguardar todas as promises e coletar todos os resultados
  // Fonte: https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/
  const validationArray = await Promise
    .all(sale.map(async (item) => {
      try {
        const productExists = await ProductsModel
          .getProductById(item.productId);
        if (!productExists
          || item.quantity < 1 
          || typeof item.quantity !== 'number'
        ) return false;
        return true;
      } catch (err) {
        return false;
      }
    }));
  if (validationArray.includes(false)) return false;
  return true;
};

const validateStock = async (sale, operation) => {
  const quantityObject = sale.reduce((obj, item) => {
    const { productId, quantity } = item;
    obj[productId] = (obj[productId] ? obj[productId] : ZERO) + quantity;
    return obj;
  },{});
  const quantityArray = Object.entries(quantityObject);
  const validationArray = await Promise
    .all(quantityArray.map(async (itemSold) => {
      const { quantity: availableQuantity } = await ProductsModel
        .getProductById(itemSold[0]);
      if (operation === '-' && itemSold[1] > availableQuantity) return false;
      return true; 
    }));
  return validationArray;
};

const restoreStock = async (sale) => {
  for(const item of sale) {
    const { productId, quantity } = item;
    const product = await ProductsModel.getProductById(item.productId);
    const newQuantity = product.quantity + quantity;
    await ProductsModel
      .updateProductById(productId, { quantity: newQuantity });
  };
};

const updateStock = async (sale, operation) => {
  // const validationArray = await Promise
  //   .all(sale.map(async (item, index) => {
  //     console.log(index);
  //     const { productId, quantity } = item;
  //     const product = await ProductsModel.getProductById(item.productId);
  //     console.log(product);
  //     console.log(quantity);
  //     if (quantity > product.quantity) return false;
  //     const newQuantity = product.quantity - quantity;
  //     const result = await ProductsModel
  //       .updateProductById(productId, { quantity: newQuantity });
  //     console.log(result);
  //   }));
  const validation = await validateStock(sale, operation);
  if (validation.includes(false)) return false;
  for(const item of sale) {
    const { productId, quantity } = item;
    const product = await ProductsModel.getProductById(item.productId);
    let newQuantity;
    if (operation === '-') {
      newQuantity = product.quantity - quantity;
    } else {
      newQuantity = product.quantity + quantity;
    }
    await ProductsModel
      .updateProductById(productId, { quantity: newQuantity });
  }
  return true;
};

const addNewSale = async (sale) => {
  const dataValidation = await productsValidation(sale);
  if (!dataValidation) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    }
  };

  const stockValidation = await updateStock(sale, '-');
  if (!stockValidation) return {
    err: {
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell'
    }
  };
  
  const result = await SalesModel.addNewSale(sale);
  return result;
};

const getAllSales = async () => {
  const result = await SalesModel.getAllSales();
  return {
    sales: result,
  };
};

const getSaleById = async (id) => {
  try {
    const result = await SalesModel.getSaleById(id);
    if (!result) return {
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    };
    return result;
  } catch (err) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    };
  }
};

const updateSaleById = async (id, newSaleInfo) => {
  const validation = await productsValidation(newSaleInfo);
  if (!validation) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    }
  };

  const result = await SalesModel.updateSaleById(id, newSaleInfo);
  if (!result) return {
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  };
  return result;
};

const deleteSaleById = async (id) => {
  const sale = await getSaleById(id);
  if (sale.err) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }
  };

  const stockValidation = await updateStock(sale.itensSold, '+');

  await SalesModel.deleteSaleById(id);
  return sale;
};

module.exports = {
  addNewSale,
  getAllSales,
  getSaleById,
  updateSaleById,
  deleteSaleById,
};