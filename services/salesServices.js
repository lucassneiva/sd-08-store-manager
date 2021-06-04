const { ObjectID, ObjectId } = require('mongodb');
const { salesModel } = require('../models');
const {
  addSales,
  findAllSales,
  findSalesById,
  getSalesToUpdate,
} = salesModel;

const CODE = 'invalid_data';

const readSales = async () => {
  const data = await findAllSales();
  return data;
};

const createSales = async (itensSold) => {
  const validation = await checkItensSold(itensSold);
  if (validation.err) return validation;

  const newSales = await addSales(itensSold);
  return { _id: newSales.insertedId, itensSold };
};

const checkItensSold = async (itensSold) => {
  const QTD = 0;
  const NUMBER_NAME = 5;

  for (const index in itensSold) {
    if (itensSold[index].quantity <= QTD
      || typeof(itensSold[index].quantity) !== 'number') {
      return {
        err: {
          code: CODE,
          message: 'Wrong product ID or invalid quantity',
        }
      };
    }
  }
  
  return true;
};

const readSalesById = async (id) => {
  const result = await findSalesById(id);
  if (!result) return {
    err: {
      code: 'not_found',
      message: 'Sale not found',
    }
  };
  return result;
};

const updateSalesById = async (id, itensSold) => {
  const validation = await checkItensSold(itensSold);
  if (validation.err) return validation;

  await getSalesToUpdate(id, itensSold);
  return { _id: id, itensSold };
};

module.exports = {
  readSales,
  createSales,
  readSalesById,
  updateSalesById,
};