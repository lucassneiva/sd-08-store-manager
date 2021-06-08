const productsModel = require('../models/productsModel');
const productsSchema = require ('../Schema/productsSchema');

const insert = async (name, quantity) => {

  const validations = await productsSchema.validate(name, quantity);

  if (validations.err) return validations;

  const data = await productsModel.insert(name, quantity);

  return { status: 201, data };
};

module.exports = {
  insert
};
