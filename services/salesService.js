const SalesModel = require('../models/salesModel');
const ProductsModel = require('../models/productsModel');

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

const addNewSale = async (sale) => {
  const validation = await productsValidation(sale);
  if (!validation) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
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