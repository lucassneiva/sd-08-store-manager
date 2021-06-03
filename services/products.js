const productsModel = require('../models/products');
const { ObjectId } = require('mongodb');

const MINIMUM_NAME_LENGTH = 5;
const MINIMUM_STOCK = 1;

const isValid = (name, quantity) => {
  if (!name) return '"name" must be inform';
  if (name.length < MINIMUM_NAME_LENGTH)
    return '"name" length must be at least 5 characters long';
  if (typeof name !== 'string') return '"name" must be a string';

  if (quantity < MINIMUM_STOCK)
    return '"quantity" must be larger than or equal to 1';
  if (!quantity) return '"quantity" must be inform';
  if (typeof quantity !== 'number') return '"quantity" must be a number';

  return false;
};

const alreadyExist = async (name) => {
  const product = await productsModel.getByName(name);
  if (product) return 'Product already exists';

  return false;
};

const create = async (name, quantity) => {
  const isProductValid = isValid(name, quantity);
  if (isProductValid) return isProductValid;

  const productAlreadyExists = await alreadyExist(name);
  if (productAlreadyExists) return productAlreadyExists;

  const { _id } = await productsModel.create(name, quantity);

  return {
    _id,
    name,
    quantity,
  };
};

const getAll = async () => await productsModel.getAll();

const getById = async (id) => {
  if (await !ObjectId.isValid(id)) return 'Wrong id format';

  const { _id, name, quantity } = await productsModel.getById(id);

  return {
    _id,
    name,
    quantity,
  };
};

const update = async (_id, name, quantity) => {
  const isProductValid = isValid(name, quantity);
  if (isProductValid) return isProductValid;

  await productsModel.update(_id, name, quantity);

  return {
    _id,
    name,
    quantity,
  };
};

const erase = async (_id) => {
  if (await !ObjectId.isValid(_id)) return 'Wrong id format';

  await productsModel.erase(_id);

  return {
    _id,
  };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  erase,
};
