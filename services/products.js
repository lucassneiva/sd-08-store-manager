const productsModel = require('../models/products');
const validProducts = require('./validProducts');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  return product;
  // const validate = validProducts.validateId(id);
  // if (validate) return({ code: 'invalid_data', message: 'Wrong id format'});
  // const product = await ProductsModel.findById(id);
  // if (!product) return({ code: 'invalid_data', message: 'Wrong id format'});
  // return ({ product });
};

const create = async (name, quantity) => {
  const findByName =  await productsModel.findByName(name);
  if (findByName) return null;
  const product = await productsModel.create(name, quantity);
  return product;
};

const updateById = async (id, updatedProduct) => {
  // const validateNameQty = await validProducts.validateNameQuantity(name, quantity);
  // if (validateNameQty.message) return validateNameQty;

  const product = await productsModel.updateById(id, updatedProduct);
  return product;
};

// const deleteById = async (id) => {
//   const result = await productsModel.deleteById(id);
//   return (result);
// };

module.exports = {
  getAll,
  create,
  getById,
  updateById,
  // deleteById,
};
