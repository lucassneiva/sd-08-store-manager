const joi = require('@hapi/joi');
const Sale = require('../models/Sale');

const HTTP_Unprocessable_Entity = 422;
const HTTP_Not_Found = 404;
const MIN_QUANTITY = 1;

// https://stackoverflow.com/questions/42656549/joi-validation-of-array
const schema = joi.array().items({
  productId: joi
    .string()
    .required(),
  quantity: joi
    .number()
    .min(MIN_QUANTITY)
    .required(),
});

const getAll = async () => {
  const allSales = await Sale.getAll();

  if (allSales === null) {
    return {
      code: 'not_found',
      error: { message: 'Sale not found' },
      status: HTTP_Not_Found
    };
  }

  return allSales;
};

const findById = async (id) => {
  const saleID = await Sale.findById(id);

  if (!saleID) {
    return {
      code: 'not_found',
      error: { message: 'Sale not found' },
      status: HTTP_Not_Found
    };
  }

  return saleID;
};

const create = async (items) => {
  const { error } = schema.validate(items);

  if (error) { 
    return {
      code: 'invalid_data',
      error: { message: 'Wrong product ID or invalid quantity' },
      status: HTTP_Unprocessable_Entity
    };
  };

  const newSale = await Sale.create(items);

  return newSale;
};

// const update = async (id, name, quantity) => {
//   const { error } = schema.validate({ name, quantity });

//   if (error) { 
//     return {
//       code: 'invalid_data',
//       error,
//       status: HTTP_Unprocessable_Entity
//     };
//   };

//   const updateProduct = await Product.update(id, name, quantity);

//   return updateProduct;
// };

// const exclude = async (id) => {
//   const productID = await Product.findById(id);

//   if (!productID) {
//     return {
//       code: 'invalid_data',
//       error: { message: 'Wrong id format' },
//       status: HTTP_Unprocessable_Entity
//     };
//   }

//   const excludeProduct = await Product.exclude(id);

//   return excludeProduct;
// };

module.exports = {
  getAll,
  findById,
  create,
  // update,
  // exclude,
};