// const joi = require('@hapi/joi');
const model = require('../models/salesModel');
const { ObjectID } = require('mongodb');

// const ONE = 1;
// const FIVE = 5;

// const UNPROCESS = 422;
const NOT_FOUND = 404;

// const schema = joi.object({
//   name: joi
//     .string()
//     .min(FIVE)
//     .message('"name" length must be at least 5 characters long')
//     .required(),
//   quantity: joi
//     .number()
//     .min(ONE)
//     .message('"quantity" must be larger than or equal to 1')
//     .required(),
// });

const getAll = async () => model.getAllSales();

const getById = async (id) => {
  const resp = await model.getById(id);

  return resp
    ? model.getById(id)
    : {
      code: 'invalid_data',
      error: { message: 'Sale not found' },
      status: NOT_FOUND,
    };
};

// const create = async (sale) => {
//   const { error } = schema.validate(sale);
//   if (error) {
//     return {
//       code: 'invalid_data',
//       error,
//       status: UNPROCESS,
//     };
//   }

//   const { name } = sale;
//   const inDB = await model.checkName(name);
//   if (inDB)
//   {
//     return {
//       code: 'invalid_data',
//       error: { message: 'Product already exists' },
//       status: UNPROCESS,
//     };
//   }

//   return model.createProduct(product);
// };

// const update = async (id, product) => {
//   const { error } = schema.validate(product);
//   if (error) {
//     return {
//       code: 'invalid_data',
//       error,
//       status: UNPROCESS,
//     };
//   }

//   const { quantity } = product;

//   if (typeof quantity !== 'number') {
//     return {
//       code: 'invalid_data',
//       error: { message: '"quantity" must be a number' },
//       status: UNPROCESS,
//     };
//   }

//   return model.updateProduct(id, product);
// };

// const exclude = async (id) => {
//   const resp = await model.getById(id);

//   return resp
//     ? model.deleteProduct(id)
//     : {
//       code: 'invalid_data',
//       error: { message: 'Wrong id format' },
//       status: UNPROCESS,
//     };
// };

module.exports = {
  getAll,
  getById,
  // create,
  // update,
  // exclude,
};
