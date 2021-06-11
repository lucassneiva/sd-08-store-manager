const Sales = require('../models/Sales');
const Products = require('../models/Products');
const { ObjectId } = require('mongodb');

const MIN_QUANTITY = 1;
const MIN_STOCK_QUANTITY = 0;
const ERROR = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  }
};


const saleIsValid = (sale) => {
  const verifyQuantity = sale.some((item) => item.quantity < MIN_QUANTITY);
  const verifyQuantityType = sale.some((item) => typeof item.quantity !== 'number');
  const verifyProductsId = sale.some(async (item) => 
    !(await Products.getById(item.productId)));
  if (!verifyProductsId) return ERROR;
  if (verifyQuantity) return ERROR;
  if (verifyQuantityType) return ERROR;
  return sale;
};

const getAll = async () => {
  const sales = await Sales.getAll();
  return {
    sales
  };
};

const getById = async (id) => {
  const sales = await Sales.getAll();
  const verifyIfExists = sales.some((sale) => sale._id = id);
  if (!ObjectId.isValid(id) || !verifyIfExists) return {
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  };
  const sale = await Sales.getById(id);
  return sale;
};

const updatedProductQuantity = (sales, add) => {
  sales.forEach(async (sale) => {
    const product = await Products.getById(sale.productId);
    if (add) {
      await Products
        .update(sale.productId, { quantity: product.quantity - sale.quantity });
    } else {
      await Products
        .update(sale.productId, { quantity: product.quantity + sale.quantity });
    }
  }); 
};

// const verifyStock = async (itensSold) => {
//   const getProducts = await Products.getAll();
//   console.log(itensSold);
//   const verify = itensSold.map((item) => {
//     const productItem = getProducts
//       .find(({ _id }) => _id === item.productId);
//     console.log(productItem);
//     const balanceQuantity = productItem.quantity - item.quantity;
//     if (balanceQuantity < MIN_STOCK_QUANTITY) return true;
//     return false;
//   });
//   console.log(verify);
//   return verify.some((item) => item === true);
// };

const create = async (sale) => {
  const saleDataIsValid = saleIsValid(sale);
  if (saleDataIsValid.err) return saleDataIsValid;
  // if (await verifyStock(sale) === true) return {
  //   err: {
  //     code: 'stock_problem',
  //     message: 'Such amount is not permitted to sell'
  //   }
  // };
  const { insertedId } = await Sales.create(sale);
  updatedProductQuantity(sale, true);
  return {
    _id: insertedId,
    itensSold: sale,
  };
};

const update = async (id, sale) => {
  const saleDataIsValid = saleIsValid(sale);
  if (saleDataIsValid.err) return saleDataIsValid;
  await Sales.update(id, sale);
  return {
    _id: id,
    itensSold: sale
  };
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }
  };
  const deletedSale = await Sales.getById(id);
  await Sales.remove(id);
  updatedProductQuantity(deletedSale.itensSold, false);
  return deletedSale;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};