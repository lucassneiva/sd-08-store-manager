const productsModels = require('../models/ProductModels');
const validations = require('./validationsProduct');

const resAddProduct = async ({ name, quantity }) => {
  const addIsValid = validations.validAddNewProduct(name, quantity);
  const findOne = await validations.findOne(name);

  if (addIsValid) return addIsValid;
  if (findOne) return { erro: findOne };

  await productsModels.addProduct(name, quantity);
  
  const res = await productsModels.findOneProduct(name);

  return { message: res[0], code: 201 };
};

const getAllProducts = async () => {
  const getAll = await productsModels.getAll();
  const resp = {
    products: [...getAll],
  };

  return { message: resp, code: 200 };
};

const findById = async (id) => {
  const findByIdIsValid = await validations.getById(id);

  if (findByIdIsValid) return { erro: findByIdIsValid };

  const findByIds = await productsModels.findOneProductById(id);

  return { message: findByIds, code: 200 };
};

const updateProduct = async ({ name, quantity }, id) => {
  const addIsValid = validations.validAddNewProduct(name, quantity);
  const findByIdIsValid = await validations.getById(id);

  if (addIsValid) return addIsValid;
  if (findByIdIsValid) return { erro: findByIdIsValid };

  await productsModels.updateOneProductById(name, quantity, id);

  const findByIds = await productsModels.findOneProductById(id);

  return { message: findByIds, code: 200 };
};

const deleteProduct = async (id) => {
  const findByIdIsValid = await validations.getById(id);

  if (findByIdIsValid) return { erro: findByIdIsValid };

  const findByIds = await productsModels.findOneProductById(id);

  await productsModels.deleteProductById(id);


  return { message: findByIds, code: 200 };
};
module.exports = {
  resAddProduct,
  getAllProducts,
  findById,
  updateProduct,
  deleteProduct,
};
