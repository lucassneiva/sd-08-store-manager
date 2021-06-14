const Joi = require('joi');
const { ObjectId } = require('mongodb');

const SalesModel = require('../models/salesModel');

const message = 'Wrong product ID or invalid quantity';
const message_2 = 'Sale not found';
const message_3 = 'Wrong sale ID format';

const emptyArray = 0;

const requestDataIsValid = (quantity) => {
  const requiredNonEmptyNumber = Joi.number().not().empty().required();
  const minValueQuantityNumber = 1;

  const erro =  Joi.object({
    quantity: requiredNonEmptyNumber.integer().min(minValueQuantityNumber),
  }).validate({ quantity });
  return erro;
};

const create = async (productsSold) => {
  const error = productsSold.find(({ productId, quantity }) => {
    if (!ObjectId.isValid(productId)) return true;
    if (requestDataIsValid(quantity).error) return true;
  });
  if (error) return { message };
  const productsById = await SalesModel.findById(productsSold);
  const arrayIds = productsById.map(({_id}) => _id.toString());
  const existingProduct = productsSold
    .find(({ productId }) => !arrayIds.includes(productId));
  if (existingProduct) return { message };

  return await SalesModel.create(productsSold);
};

// const create = async (productsSold) => {
//   // console.log('SERVICE productsSold', productsSold);
//   const error = productsSold.find(({ productId, quantity }) => {
//     if (!ObjectId.isValid(productId)) {
//       // console.log('erro de validação ID');
//       return true;
//     }
//     if (requestDataIsValid(quantity).error) {
//       // console.log('erro de validação quantidade');
//       return true;
//     }
//   });
//   // console.log('ERROR', error);
  
//   if (error) {
//     // console.log('retorna menssagem');
//     return { message };
//   }
//   const productsById = await SalesModel.findById(productsSold);
//   // console.log('productsById', productsById);
//   // console.log('productsSold', productsSold);
//   const arrayIds = existingProduct.map(({_id}) => _id.toString());
//   const existingProduct = productsSold
//     .find(({ productId }) => !arrayIds.includes(productId));
//   // console.log('existingProduct', existingProduct);
//   if (existingProduct) return { message };

//   return await SalesModel.create(productsSold);
// };

const getAll = async () => {
  const products = await SalesModel.getAll();
  return products;
};

const getByIds = async (id) => {
  if(!ObjectId.isValid(id)) return { message: message_2 };
  const sale = await SalesModel.getByIds(id);
  // console.log('GETBYIDS SERVICE', sale);
  if (!sale || sale.length === emptyArray) {
    // console.log('entrou no getbyids vazio');
    return { message: message_2 };
  }
  return sale;
};




const deleteById = async (id) => {
  if(!ObjectId.isValid(id)) return { message: message_3 };
  const sale = await SalesModel.deleteById(id);
  console.log('SERVICE', sale);
  if (sale.length === emptyArray) {
    console.log('entrou sale vazio SERVICE');
    return { message_3 };
  }
  return sale;
};

module.exports = {
  create,
  getAll,
  getByIds,
  // updateById,
  deleteById,
};
