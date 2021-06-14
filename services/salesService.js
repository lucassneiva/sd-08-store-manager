const objErrorGenerator = require('../utils/errorObjGenerator');
const salesModel = require('../models/salesModel');
const salesSchema = require('../schema/salesSchema');

const UNPROCESSABLE_ENTITY = 422;
const NOT_FOUND = 404;

const validate = (arr) => {
  return arr.reduce((acc, obj) => {
    const { error } = salesSchema.validate(obj);
    if (error) {
      acc += error.details[0].message;
      arr.splice(1);
      return acc;
    }
    return '';
  }, '');
};

const create = async (itensSold) => {
  const errorMsg = validate(itensSold);
  if (errorMsg) {
    const message = errorMsg;
    return objErrorGenerator(UNPROCESSABLE_ENTITY, 'invalid_data', message);
  }

  const result = itensSold.reduce(async (promiseAcc, cur) => {
    const acc = await promiseAcc;

    if (!acc._id) {
      const { insertedId } = await salesModel.create({ itensSold: [cur] });
      acc._id = insertedId;
      acc.itensSold.push(cur);
      return acc;
    }

    await salesModel.updateCreate(acc._id, cur);
    acc.itensSold.push(cur);

    return acc;

  }, Promise.resolve({ _id: '', itensSold: [] }));

  return result;
};

const getById = async (id) => {
  const product = await salesModel.getById(id);
  if (product.error === 'NotFound') {
    const message = 'Sale not found';
    return objErrorGenerator(NOT_FOUND, 'not_found', message);
  };
  if (product.error === 'IdIncorrectFormat') {
    const message = 'Wrong sale ID format';
    return objErrorGenerator(UNPROCESSABLE_ENTITY, 'invalid_data', message);
  }
  return product;
};

const getAll = () => {
  return salesModel.getAll();
};


const update = async (id, itensSold) => {
  const errorMsg = validate(itensSold);
  if (errorMsg) {
    const message = errorMsg;
    return objErrorGenerator(UNPROCESSABLE_ENTITY, 'invalid_data', message);
  }
  await salesModel.update(id, itensSold);
  return { _id: id, itensSold };
};

const remove = async (id) => {
  const resultID = await getById(id);
  if (resultID.error) {
    return resultID;
  }
  await salesModel.remove(id);
  return resultID;

};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove
};
