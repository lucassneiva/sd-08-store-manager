const salesModel = require('../models/salesModel');
const objErrorGenerator = require('../utils/errorObjGenerator');
const salesSchema = require('../schema/salesSchema');

const UNPROCESSABLE_ENTITY = 422;

const validate = (arr) =>{
  return arr.reduce((acc, obj) =>{
    const { error } = salesSchema.validate(obj);
    if(error){
      acc +=error.details[0].message;
      arr.splice(1);
      return acc;
    }
    return '';
  },'');
};

const create = async (itensSold) => {
  const errorMsg = validate(itensSold);
  if (errorMsg) {
    const message = errorMsg;
    return objErrorGenerator(UNPROCESSABLE_ENTITY, 'invalid_data', message);
  }

  const result = itensSold.reduce(async (promiseAcc, cur, array) => {
    const acc = await promiseAcc;

    if (!acc._id) {
      const { insertedId } = await salesModel.create({ itensSold: [cur] });
      acc._id = insertedId;
      acc.itensSold.push(cur);
      return acc;
    }

    await salesModel.update(acc._id, cur);
    acc.itensSold.push(cur);

    return acc;

  }, Promise.resolve({ _id: '', itensSold: [] }));

  return result;
};

const getAll = () => {
  return salesModel.getAll();
};

// getAll().then(console.log);

module.exports = {
  create,
  getAll,
};

