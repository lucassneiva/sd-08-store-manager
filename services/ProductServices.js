const productsModels = require('../models/ProductModels');
const validations = require('./validationsProduct');

const resAddProduct = async ({ name, quantity }) => {
  const addIsValid = validations.validAddNewProduct(name, quantity);
  const findOne = await validations.findOne(name);

  if (addIsValid) return addIsValid;
  if (findOne) return { erro: findOne }

  await productsModels.addProduct(name, quantity);
  
  const res = await productsModels.findOneProduct(name);

  return { message: res[0], code: 201 };
}

module.exports = {
  resAddProduct,
};