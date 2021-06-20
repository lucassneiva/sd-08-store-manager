const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const getAllSales = async () => {
  return salesModel.getAllSales();
};

const findSale = async (saleId) => {
  const result = await salesModel.findSale(saleId);
  if (!result) return ({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    }
  });
  return result;
};

// const validateSale = (sale) => {
//   const err = {
//     err: {
//       code: 'invalid_data',
//       message: 'Wrong product ID or invalid quantity',
//     }
//   };
//   for (let index = 1; index <= sale.length; index += 1) {
//     const { productId, quantity } = sale[index - 1];
//     if (typeof quantity === 'string' || quantity < 1) return err;
//   }
//   return null;
// };

const createSale = async (sale) => {
  const saleId = await salesModel.createSale(sale);
  if (!saleId) return null;
  return ({
    _id: saleId,
    itensSold: [...sale],
  });
};

const updateSale = async (saleId, changes) => {
  await salesModel.updateSale(saleId, changes);
  return ({
    _id: saleId,
    itensSold: [...changes],
  });
};

// const saleQuantity = async (products, operation) => {
//   const err = {
//     err: {
//       code: 'stock_problem',
//       message: 'Such amount is not permitted to sell',
//     }
//   };
//   try {
//     for (let index = 1; index <= products.length; index += 1) {
//       const id = products[index - 1].productId;
//       const quant = operation * products[index - 1].quantity;

//       const { quantity } = await productsModel.findProduct(id);
//       if (Math.abs(quant) > quantity) {
//         return err;
//       }
//       await productsModel.updateProduct(id, products[index - 1], 'inc', quant);
//     }
//     return null;
//   } catch { }
// };

const deleteSale = async (saleId) => {
  const result = await salesModel.deleteSale(saleId);
  if (!result) return ({
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    }
  });
  return result;
};

module.exports = {
  getAllSales,
  findSale,
  createSale,
  updateSale,
  deleteSale,
};
