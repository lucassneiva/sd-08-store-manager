const productsModel = require('../models/productsModel');
const productsSchema = require ('../Schema/productsSchema');

const ZERO_MODIFIED = 0;

const insert = async (name, quantity) => {
  const validations = await productsSchema.validate(name, quantity);
  const alreadyExists = await productsSchema.productExists(name);

  if (validations) return validations;
  if (alreadyExists) return alreadyExists;

  const data = await productsModel.insert(name, quantity);

  return { status: 201, data };
};

const findById = async (id) => {
  const data = await productsModel.findById(id);

  if(!data) return null;

  return { status: 200, data };
};

const getAll = async () => {
  const products = await productsModel.getAll();
  if(!products) return null;

  return { status: 200, products };
};

const updateByID = async (id, name, quantity) => {
  const validations = await productsSchema.validate(name, quantity);

  if (validations) return validations;

  const data = await productsModel.updateByID(id, name, quantity);
  if(data.nModified === ZERO_MODIFIED) return null;

  return { status: 200, message: { id, name, quantity } };
};

module.exports = {
  insert,
  findById,
  getAll,
  updateByID
};
