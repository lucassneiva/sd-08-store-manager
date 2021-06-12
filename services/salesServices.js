const salesModel = require('../models/salesModel');
const salesSchema = require ('../Schema/salesSchema');
const { atualizarEstoque, atualizarEstoqueDelete } = require('../utils/atualizarEstoque');

const ZERO_MODIFIED = 0;

const insert = async (itens) => {
  const validations = await salesSchema.validate(itens);
  if (validations) return validations;

  atualizarEstoque(itens);

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
  const sales = await salesModel.getAll();
  if(!sales) return null;

  return { status: 200, sales };
};

const updateByID = async (id, itensSold) => {
  const validations = await salesSchema.validate(itensSold);
  if (validations) return validations;

  const data = await salesModel.updateByID(id, itensSold);
  if(data.modifiedCount === ZERO_MODIFIED) return null;

  return { status: 200, _id: id, itensSold };
};

const deleteByID = async (id) => {
  const sale = await findById(id);
  if(!sale) return null;
  await atualizarEstoqueDelete(sale.data.itensSold);

  const resp = await salesModel.deleteByID(id);
  if(resp && resp.deletedCount && resp.deletedCount === 1) return { status: 200, resp };

  return null;
};

module.exports = {
  insert,
  findById,
  getAll,
  updateByID,
  deleteByID
};
