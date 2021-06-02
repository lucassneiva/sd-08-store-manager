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

const createQuantityObject = (sale) => {
  const quantityObject = sale.reduce((obj, item) => {
    const { productId, quantity } = item;
    obj[productId] = (obj[productId] ? obj[productId] : ZERO) + quantity;
    return obj;
  },{});
  return quantityObject;
};

const validateAndUpdateStock = async (sale, operation) => {
  const quantityObject = createQuantityObject(sale);
  const itensIdArray = Object.keys(quantityObject);
  const soldQuantityArray = Object.values(quantityObject);
  const productQuantityArray = await Promise.all(itensIdArray.map(async (itemId) => {
    const { quantity } = await ProductsModel.getProductById(itemId);
    return quantity;
  }));
  const validationArray = productQuantityArray.map((productQuantity, index) => {
    if (operation === '-') return productQuantity - soldQuantityArray[index];
    if (operation === '+') return productQuantity + soldQuantityArray[index];
  });
  const validation = validationArray.reduce((acc, value) => {
    if (value < ZERO) acc = false;
    return acc;
  }, true);
  if (!validation) return false;
  await Promise.all(itensIdArray.map(async (itemId, index) => {
    await ProductsModel.updateProductById(itemId, { quantity: validationArray[index] });
  }));
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

  const stockValidation = await validateAndUpdateStock(sale, '-');
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

  const stockValidation = await validateAndUpdateStock(sale.itensSold, '+');

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