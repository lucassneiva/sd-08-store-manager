const salesModel = require('../models/salesModel');
const salesSchema = require ('../Schema/salesSchema');

const ZERO_MODIFIED = 0;

const insert = async (itens) => {
  const validations = await salesSchema.validate(itens);

  if (validations) return validations;

  const data = await salesModel.insert(itens);

  if(!data) return null;

  return { status: 200, data };
};

const findById = async (id) => {
  const data = await salesModel.findById(id);

  if(!data) return null;

  return { status: 200, data };
};

const getAll = async () => {
  const data = await salesModel.getAll();
  if(!data) return null;

  return { status: 200, data };
};

const updateByID = async (id, productId, quantity) => {
  const validations = await salesSchema.validate(productId, quantity);

  if (validations) return validations;

  const data = await salesModel.updateByID(id, productId, quantity);
  if(data.nModified === ZERO_MODIFIED) return null;

  return { status: 200, message: { id, productId, quantity } };
};

const deleteByID = async (id) => {
  const data = await salesModel.deleteByID(id);

  if(data && data.deletedCount && data.deletedCount === 1) return { status: 200, data };

  return null;
};

module.exports = {
  insert,
  findById,
  getAll,
  updateByID,
  deleteByID
};
