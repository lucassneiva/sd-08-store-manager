const productsModel = require('../models/productsModel');
const productsSchema = require('../schema/productsSchema');
const objErrorGenerator = require('../utils/errorObjGenerator');

const UNPROCESSABLE_ENTITY = 422;

const create = async (dataForUpdate) => {
  const { error } = productsSchema.product.validate(dataForUpdate);
  if (error) {
    const message = error.details[0].message;
    return objErrorGenerator(UNPROCESSABLE_ENTITY, 'invalid_data', message);
  }

  const { name } = dataForUpdate;
  const existsProduct = await productsModel.getByName(name);
  if (existsProduct) {
    const message = 'Product already exists';
    return objErrorGenerator(UNPROCESSABLE_ENTITY, 'invalid_data', message);
  };

  const { ops } = await productsModel.create(dataForUpdate);
  return ops[0];
};

const getAll = () => productsModel.getAll();

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (product.error) {
    const message = 'Wrong id format';
    return objErrorGenerator(UNPROCESSABLE_ENTITY, 'invalid_data', message);
  };

  return product;
};

const update = async (id, dataForUpdate) => {
  const { error } = productsSchema.product.validate(dataForUpdate);
  if (error) {
    const message = error.details[0].message;
    return objErrorGenerator(UNPROCESSABLE_ENTITY, 'invalid_data', message);
  };

  const result = await productsModel.update(id, dataForUpdate);
  if (result !== undefined)
    return { _id: id, ...dataForUpdate };
};

const remove = async (id) => {
  const { error } = await productsModel.getById(id);
  if (error) {
    const message = 'Wrong id format';
    return objErrorGenerator(UNPROCESSABLE_ENTITY, 'invalid_data', message);
  };

  const result = await productsModel.remove(id);
  return result;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove
};
