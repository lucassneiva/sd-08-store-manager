const salesModel = require('../models/sales');
const { ObjectId } = require('mongodb');

const MINIMUM_STOCK = 1;
const EMPTY = 0;

const isValid = (quantity) => {
  if (quantity < MINIMUM_STOCK || !quantity || typeof quantity !== 'number')
    return 'Wrong product ID or invalid quantity';

  return false;
};

const create = async (arr) => {
  const isSaleValid = arr.map(({ quantity }) => isValid(quantity))
    .filter(element => typeof element !== 'boolean');

  if (isSaleValid.length !== EMPTY) return isSaleValid[0];

  const { _id } = await salesModel.create(arr);

  return {
    _id,
    itensSold: arr,
  };
};

const getAll = async () => await salesModel.getAll();

const getById = async (id) => {
  if (await !ObjectId.isValid(id)) return 'Sale not found';

  const sale = await salesModel.getById(id);

  if (!sale) return 'Sale not found';

  const { _id, itensSold } = sale;

  return {
    _id,
    itensSold,
  };
};

const update = async (_id, arr) => {
  const isSaleValid = arr.map(({ quantity }) => isValid(quantity))
    .filter(element => typeof element !== 'boolean');

  if (isSaleValid.length !== EMPTY) return isSaleValid[0];

  await salesModel.update(_id, arr);

  return {
    _id,
    itensSold: arr,
  };
};

const erase = async (_id) => {
  if (await !ObjectId.isValid(_id)) return 'Wrong sale ID format';

  await salesModel.erase(_id);

  return true;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  erase,
};
