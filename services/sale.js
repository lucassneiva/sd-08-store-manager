const joi = require('@hapi/joi');
const model = require('../models/saleModel');

const ONE = 1;

const schema = joi.array().items({
  productId: joi
    .string()
    .required(),
  quantity: joi
    .number()
    .min(ONE)
    .required(),
});

const getAll = async () => {
  const listAllSales = await model.getAll();

  if (!listAllSales) {
    return {
      code: 'not_found',
      error: { message: 'Sale not found'},
      status: 404
    };
  }
  return listAllSales;
};

const add = async (itensSold) => {
  const { error } = schema.validate(itensSold);
  if (error) {
    return {
      code: 'invalid_data',
      error: { message: 'Wrong product ID or invalid quantity'},
      status: 422
    };
  }

  return await model.add(itensSold);
};

const getById = async (id) => {
  const saleId = await model.getById(id);

  if (!saleId) {
    return {
      code: 'not_found',
      error: { message: 'Sale not found'},
      status: 404
    };
  }

  return saleId;
};

// const update = async (id, name, quantity) => {
//   const { error } = schema.validate({ name, quantity });

//   if (error) { 
//     return {
//       code: 'invalid_data',
//       error,
//       status: 422
//     };
//   };

//   const productId = await model.update(id, name, quantity);

//   return productId;
// };

// const deleteProduct = async (id) => {
//   const product = await model.getById(id);
  
//   if (!product){
//     return {
//       code: 'invalid_data',
//       error: { message: 'Wrong id format' },
//       status: 422
//     };
//   }

//   const deletedProduct = await model.deleteProduct(id);
  
//   return deletedProduct;
// };


module.exports = {
  getAll,
  add,
  getById,
  // update,
  // deleteProduct,
}; 
  
