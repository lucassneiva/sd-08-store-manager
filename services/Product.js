const ProductModel = require('../models/Product');

const findByName = (name) => ProductModel.findByName(name);

const create = async (newProduct) => {
  const findName = await findByName(newProduct.name);

  if (findName) return null;

  return ProductModel.create(newProduct);
};

const getAll = async () => ({ products: await ProductModel.getAll() });

const findById = async (id) => {
  const result = await ProductModel.findyById(id);
  if (!result) return null;
  return result;
};

const update = async (id, product) => {
  const result = await ProductModel.update(id, product);
  if (!result) return null;
  return { _id: id, ...product };
};

module.exports = {
  create,
  getAll,
  findById,
  update,
};
