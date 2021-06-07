const model = require('../../models/productModel');
const HTTP = require('../../utils/httpStatusCodes');
const generateError = require('../../utils/generateError');

module.exports = async (id) => {
  try {
    return {
      status: HTTP.OK,
      result: id ? await model.getById(id) : { products: await model.getAll() },
    };
  } catch (err) {
    return generateError('Wrong id format');
  }
};
