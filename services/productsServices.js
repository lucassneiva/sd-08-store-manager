const productsModel = require('../models/productsModel');
const productsSchema = require ('../Schema/productsSchema');

const insert = async (name, quantity) => {
  const validations = await productsSchema.validate(name, quantity);

  if (validations) return validations;

  const data = await productsModel.insert(name, quantity);

  return { status: 201, data };
};

const findById = async (id) => {
  const data = await productsModel.findById(id);

  if(!data) return null;

  return { status: 200, data };
};

const getAll = async () => {
  const products = await productsModel.getProducts();
  if(!products) return null;

  return { status: 200, products };
};

module.exports = {
  insert,
  findById,
  getAll
};
