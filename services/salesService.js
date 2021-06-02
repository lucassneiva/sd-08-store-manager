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

module.exports = {
  addNewSale,
};