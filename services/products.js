const productsModel = require('../models/products');
const validProducts = require('./validProducts');

const getAll = async () => {
  const products = await productsModel.getAll();
  return ({products: products});
};

const findById = async (id) => {
  const validate = validProducts.validateId(id);
  if (validate) return({ code: 'invalid_data', message: 'Wrong id format'});

  const product = await ProductsModel.findById(id);
  if (!product) return({ code: 'invalid_data', message: 'Wrong id format'});

  return ({ product });
};

const create = async (name, quantity) => {

  const validate = validProducts.validateNameQuantity(name, quantity);
  if (validate.message) return validate;

  const validateNameExist = await validProducts.nameExist(name);
  if (validateNameExist.message) return validateNameExist;

  const product = await productsModel.create(name, quantity);

  return ({ product });
};

const updateById = async (id, name, quantity) => {
  const validateNameQty = await validProducts.validateNameQuantity(name, quantity);
  if (validateNameQty.message) return validateNameQty;

  const product = await productsModel.updateById(id, name, quantity);
  return ({ product });
};

const deleteById = async (id) => {
  const result = await productsModel.deleteById(id);
  return (result);
};

module.exports = {
  getAll,
  create,
  findById,
  updateById,
  deleteById,
};
