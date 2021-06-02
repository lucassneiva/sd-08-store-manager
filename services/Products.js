const ProductsModel = require('../models/Product');

const create = async (product) => {
  const result = await ProductsModel.getByName(product.name);
  if (result) return {
    err: {
      code: 'invalid_data',
      message: 'Product already exists'
    }
  };
  return ProductsModel.create(product);
};

const getById = async (id) => {
  const result = await ProductsModel.getById(id);
  if (!result) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  };
  return result;
};

const getAll = () => ProductsModel.getAll();

const edit = (id, updatedProduct) => ProductsModel.edit(id, updatedProduct);

const remove = async (id) => {
  const result = await ProductsModel.remove(id);
  if (!result) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  };
  return result;
};

module.exports = {
  create,
  getById,
  getAll,
  edit,
  remove
};
