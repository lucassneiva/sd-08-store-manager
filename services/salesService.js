const salesModel = require('../models/salesModel');
const objErrorGenerator = require('../utils/errorObjGenerator');
const salesSchema = require('../schema/salesSchema');

const UNPROCESSABLE_ENTITY = 404;

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

  const result = itensSold.reduce(async (promiseAcc, cur) => {
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


const getSales = async (id = false) => {
  if (!id) {
    const result = await salesModel.getAll();
    return result;
  }

  const product = await salesModel.getById(id);
  if (product.error) {
    const message = 'Sale not found';
    return objErrorGenerator(UNPROCESSABLE_ENTITY, 'not_found', message);
  };

  return product;
};

//getSales().then(console.log);

module.exports = {
  create,
  getSales,
};

