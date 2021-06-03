const ProductModel = require('../models/Product');

const findByName = (name) => ProductModel.findByName(name);

const create = async (newProduct) => {
  const findName = await findByName(newProduct.name);

  if (findName) return null;

  return ProductModel.create(newProduct);
};

module.exports = {
  create,
};
